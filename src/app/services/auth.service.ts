import { Component, Injectable } from '@angular/core';
import { User } from '../models/user/user.model';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword, getAuth, user, signOut } from '@angular/fire/auth';
import { doc, getFirestore, setDoc, getDoc, collection, getDocs,updateDoc } from '@angular/fire/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore/lite';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loggedUser: any;
  userProfile?: User | null;
  userList:any[] = [];
  user$ : Observable<any>;
  userSub = new Subject<any>();

  constructor(private _auth: Auth ) {

    this.user$ = this.userSub.asObservable();
    onAuthStateChanged(getAuth(),
      (user) => {
        if (user) {
          this.loggedUser = user
          this.userSub.next(user);
          console.log("usuario logueado");
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

  async setUserInfo(user: any)
  {
    let path = `userInfo/${user.mail}`;
    await setDoc(doc(getFirestore(),path),
    {
      active: !user.medic,
      userInfo:user
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



  async logIn(mail: string, password: string)
  {
    try
    {
      await signInWithEmailAndPassword(this._auth,mail,password).then(async res => {
        this.loggedUser = res.user;
        console.log(this.loggedUser);
        await this.getUserInfo(mail);
        console.log(this.userProfile);

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
