import { Component, inject, Injectable } from '@angular/core';
import { User } from '../models/user/user.model';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword, getAuth, user, signOut } from '@angular/fire/auth';
import { doc, getFirestore, setDoc, getDoc, collection, getDocs,updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { onAuthStateChanged, sendEmailVerification } from '@firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from './utils.service';
import { Especialidades } from '../models/user/medicspeciality.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loggedUser: any;
  userProfile?: User | null;
  userActive:boolean = false;
  userList:any[] = [];
  user$ : Observable<any>;
  userSub = new Subject<any>();

  toastSvc = inject(ToastrService);
  router = inject(UtilsService);
  storage = getStorage();

  constructor(private _auth: Auth ) {

    this.user$ = this.userSub.asObservable();
    onAuthStateChanged(getAuth(),
      (user) => {
        if (user) {
          this.loggedUser = user
          this.userSub.next(user);
          this.getUserInfo(this.loggedUser.email);
          console.log(this.loggedUser.email);
        } else {
          this.loggedUser = null
          this.userSub.next(null);
          console.log("Se cerro sesion.");
        }
      },
      (error) => {
        console.log("error")
      }
      // Handle errors (optional)this.mensajePersonalizadoFirebase(err.message)
    );

  }

  async createNewUser(user:User,password: string)
  {
    let alias = await createUserWithEmailAndPassword(this._auth,user.mail as string,password as string).then((userCredential) => {
      this.loggedUser = userCredential.user;
      this.userProfile=user;

      this.setUserInfo(this.serializeUser());

      console.log(this.loggedUser);

    }).catch
    (error => {

      console.log(error);
      throw error;
    })
  }

  async createNewMedic(user:User,password: string, especialidades:Especialidades[])
  {
    let alias = await createUserWithEmailAndPassword(this._auth,user.mail as string,password as string).then((userCredential) => {
      this.loggedUser = userCredential.user;
      this.userProfile=user;

      this.setUserInfo(this.serializeUser());
      this.setMedicInfo(user, especialidades)

      console.log(this.loggedUser);

    }).catch
    (error => {

      console.log(error);
      throw error;
    })
  }

  async setUserInfo(user: any)
  {
    let path = `userInfo/${user.mail}`;
    await setDoc(doc(getFirestore(),path),
    {
      active: !user.medic,
      userInfo:user
    })
  }

  async setMedicInfo(user: User,especialidades: Especialidades[])
  {
    let path = `medicInfo/${user.mail}`;
    await setDoc(doc(getFirestore(),path),{
      specialities: especialidades
    })
  }
  
  async enableAccount(user: any,enable:boolean)
  {
    let path = `userInfo/${user.userInfo.mail}`;
    await updateDoc(doc(getFirestore(),path),
    {
      active: enable,
    })
  }

  serializeUser()
  {
    let userInfo;
    if (this.userProfile?.medic)
    {
      userInfo = this.userProfile.info
      .filter(specialty => specialty.isChecked) // Only include checked specialities
      .map(specialty => specialty.name) || [];
    }
    else
    {
      userInfo = this.userProfile?.info;
    }

    const userData = {
      mail: this.userProfile?.mail,
      name: this.userProfile?.name,
      surename: this.userProfile?.surename,
      age: this.userProfile?.age,
      dni: this.userProfile?.dni,
      admin: this.userProfile?.admin,
      medic: this.userProfile?.medic,
      info: userInfo,
      image: this.userProfile?.image || [],
    };

    return userData;
  }

  async savePhoto(photo: any, path: string) {
    let storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, photo)
    return await getDownloadURL(storageRef)
  }


  async logIn(mail: string, password: string)
  {
    try
    {
      await signInWithEmailAndPassword(this._auth,mail,password).then(async res => {
        if(!this.loggedUser.emailVerified && !this.userProfile?.admin)
          {
            sendEmailVerification(res.user)
            this.toastSvc.error("Se le envio un email para verificar su correo", "email no verificado");
          this.logout(true)
        }
        else if(!this.userActive)
          {
            this.toastSvc.error("Comuniquese con su administrador de sistemas", "cuenta desactivada");
            this.logout(true);
          }else
          {
            this.loggedUser = res.user;
            //console.log(this.loggedUser);
            await this.getUserInfo(mail);
            //console.log(this.userProfile);
            console.log(this.loggedUser.emailVerified);
        }

      })
    }
    catch (error)
    {
      throw error;
    }
  }

  logout(noToast?: boolean) {
    signOut(getAuth())
      .then(() => {
        if (!noToast) {
          console.log("usuario deslogeado")
        }
        this.loggedUser = null
        this.router.goto("home");
      })
      .catch(() => {
        console.log("error en el deslogueo")
      })
  }


  async getUserInfo(mail: string)
  {
    let path = `userInfo/${mail}`;

    let data = await getDoc(doc(getFirestore(),path));

    try {
      const docSnapshot = await  getDoc(doc(getFirestore(),path)); // Fetch the document
  
      if (docSnapshot.exists()) {
        const data = docSnapshot.data(); // Get the document data
  
        // Map the data to userProfile
        this.userProfile = {
          mail: data["userInfo"].mail as string,
          name: data["userInfo"].name as string,
          surename: data["userInfo"].surename as string,
          age: data["userInfo"].age as string,
          dni: data["userInfo"].dni as string,
          admin: data["userInfo"].admin as boolean,
          medic: data["userInfo"].medic as boolean,
          info: data["userInfo"].info as string[], // Assuming info is a string array
          image: data["userInfo"].image as string[], // Assuming image is a string array
        };

        this.userActive = data["active"] as boolean;

      } else {
        console.log('No such document!');
        this.userProfile = null; // Set userProfile to null if the document doesn't exist
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error; // Propagate the error to the caller
    }
  }


  async getUserList()
  {
    let path = `userInfo`;
  
    let data = await getDocs(collection(getFirestore(),path));
  
    this.userList = data.docs.map(doc => ({
      userInfo: doc.data()['userInfo'],
      active: doc.data()['active'] as boolean
    })  
  );
    
  }


  async createNewAdmin(user:any,password: string)
  {
    let alias = await createUserWithEmailAndPassword(this._auth,user.mail as string,password as string).then((userCredential) => {
      this.loggedUser = userCredential.user;
      this.userProfile=user;

      this.setAdminInfo(user);

      console.log(this.loggedUser);

    }).catch
    (error => {

      console.log(error);
      throw error;
    })
  }

  async setAdminInfo(user: any)
  {
    let path = `userInfo/${user.mail}`;
    await setDoc(doc(getFirestore(),path),
    {
      active: true,
      userInfo: {
        mail: user.mail,
        name: user.name,
        surename: user.surename,
        age: user.age,
        dni: user.dni,
        admin: true,
        medic: false,
        info: user.info,
        image: user.image || [],
      }
    })
  }

}
