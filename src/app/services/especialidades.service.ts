import { Injectable } from '@angular/core';
import { doc, getFirestore, setDoc, getDoc, collection, getDocs,updateDoc } from '@angular/fire/firestore';
import { onAuthStateChanged, sendEmailVerification } from '@firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore/lite';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor() { }

  especialidadesList?: any[];

  async getEspecialidadesList()
  {
    let path = `especialidades`;
  
    let data = await getDocs(collection(getFirestore(),path));
  
    this.especialidadesList = data.docs.map(doc => ({
      name: doc.data()['name']
    })  
  );
    
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
