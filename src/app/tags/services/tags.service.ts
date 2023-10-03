import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, collectionSnapshots, doc, endAt, orderBy, query, serverTimestamp, setDoc, startAt, writeBatch } from '@angular/fire/firestore';
import { Observable, from, pipe } from 'rxjs';
import { Tag } from 'src/app/core/models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private firestore: Firestore) { }

  add(tag: Tag): Observable<any> {
    const dbRef = collection(this.firestore, 'tags');
    return from(addDoc(dbRef, tag));
  }

  update(tag: Tag): Observable<any> {
    const dbRef = doc(this.firestore, 'tags', tag.uid);
    return from(setDoc(dbRef, tag));
  }

  delete(tags: Tag[]): Observable<any> {
    let batch = writeBatch(this.firestore);
    tags.forEach(tag => {
      const dbRef = doc(this.firestore, 'tags', tag.uid);
      batch.delete(dbRef)
    });
    return from(batch.commit());
  }

  getById() {}

  getAll(): Observable<Tag[]> {
    const itemCollection = query(collection(this.firestore, 'tags'));
    return collectionData(itemCollection, {idField: 'uid'}) as Observable<Tag[]>;
  }

  search(searchQuery: string): Observable<Tag[]> {
    const itemCollection = query(collection(this.firestore, 'tags'), orderBy('name', 'asc'), startAt(searchQuery), endAt(searchQuery + '\uf8ff'));
    return collectionData(itemCollection, {idField: 'uid'}) as Observable<Tag[]>;
  }
}
