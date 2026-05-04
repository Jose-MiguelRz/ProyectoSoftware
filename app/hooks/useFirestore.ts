import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

// Hook para leer datos de una colección
export function useFirestoreCollection(collectionName: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(items);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error(`Error fetching ${collectionName}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, loading, error };
}

// Hook para agregar documento
export function useAddFirestoreDocument(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const add = async (data: any) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date().toISOString()
      });
      setError(null);
      return docRef.id;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { add, loading, error };
}

// Hook para actualizar documento
export function useUpdateFirestoreDocument(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (docId: string, data: any) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, collectionName, docId), {
        ...data,
        updatedAt: new Date().toISOString()
      });
      setError(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}

// Hook para eliminar documento
export function useDeleteFirestoreDocument(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (docId: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, collectionName, docId));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}
