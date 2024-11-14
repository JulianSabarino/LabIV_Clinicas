import { Injectable } from '@angular/core';
import { doc, getFirestore, setDoc, getDoc, collection, getDocs,updateDoc } from '@angular/fire/firestore';
import { onAuthStateChanged, sendEmailVerification } from '@firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore/lite';
import { Especialidades } from '../models/user/medicspeciality.model';
import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor() { }

  especialidadesList?: any[];
  loggedEspecialities: Especialidades[] = [];

  async getEspecialidadesList()
  {
    let path = `especialidades`;
  
    let data = await getDocs(collection(getFirestore(),path));
  
    this.especialidadesList = data.docs.map(doc => ({
      name: doc.data()['name']
    })  
  );
    
  }
  
  async getLoggedEspecialidadesList(user:any)
  {
    this.loggedEspecialities = [];
    let path = `medicInfo/${user.mail}`;
  
    let docSnapshot = await getDoc(doc(getFirestore(),path));
    if(docSnapshot.exists())
    {
      let data = docSnapshot.data(); 
      this.loggedEspecialities = data["specialities"] as Especialidades[]
    }
    
  }

  async updateLoggerdEspecialidades(user:any)
  {
    if(this.loggedEspecialities)
    {
      let path = `medicInfo/${user.mail}`;
      await updateDoc(doc(getFirestore(),path),{
        specialities: this.loggedEspecialities
      })
    }

  }


  async newEspecialidad(especialidad: string)
  {
    let path = `especialidades/${especialidad}`;
  
    await setDoc(doc(getFirestore(),path),
    {
      name:especialidad
    })

  }

}
