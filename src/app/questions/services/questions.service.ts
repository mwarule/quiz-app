import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, query, where, writeBatch } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { Question } from 'src/app/core/models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private firestore: Firestore) { }

  add(question: Question): Observable<any> {
    const dbRef = collection(this.firestore, 'questions');
    return from(addDoc(dbRef, question));
  }

  update(question: Question): Observable<any> {
    console.log(question)
    const dbRef = doc(this.firestore, 'questions', question.uid);
    return from(setDoc(dbRef, question));
  }

  delete(questions: Question[]): Observable<any> {
    let batch = writeBatch(this.firestore);
    questions.forEach(q => {
      const dbRef = doc(this.firestore, 'questions', q.uid);
      batch.delete(dbRef)
    });
    return from(batch.commit());
  }

  getById(id: string): Observable<Question> {
    const dbRef = doc(this.firestore, 'questions', id);
    return from(docData(dbRef, {idField: 'uid'})) as Observable<Question>;
  }

  getAll(): Observable<Question[]> {
    const itemCollection = query(collection(this.firestore, 'questions'));
    return collectionData(itemCollection, {idField: 'uid'}) as Observable<Question[]>;
  }

  getByType(type: string): Observable<Question[]> {
    const itemCollection = query(collection(this.firestore, 'questions'), where('type', '==', type));
    return collectionData(itemCollection, {idField: 'uid'}) as Observable<Question[]>;
  }
}
