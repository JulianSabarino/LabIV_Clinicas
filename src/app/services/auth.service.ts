import { Injectable } from '@angular/core';
import { User } from '../models/user/user.model';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { doc, getFirestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loggedUser: any;
  userProfile?: User;

  async createNewUser(user:User,password: string)
  {
    let alias = await createUserWithEmailAndPassword(getAuth(), user.mail as string,password as string).then((userCredential) => {
      this.loggedUser = userCredential.user;
      this.userProfile=user;

      //this.setUserInfo(this.loggedUser);

      console.log(this.loggedUser);

      

    }).catch
    (error => {

      console.log(error);
    })
  }

  async setUserInfo(user: User)
  {
    let path = `userInfo/${user.mail}`;
    await setDoc(doc(getFirestore(),path),
    {
      userInfo:user
    })
  }
}
