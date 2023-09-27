import {
  CollectionReference,
  QueryConstraint,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamCollection = <T>(
  colRef: CollectionReference<T>,
  ...queryConstraints: QueryConstraint[]
) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryRef = query(colRef, ...queryConstraints);
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const data: T[] = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          _id: doc.id,
        };
      });

      setData(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [colRef]);

  return {
    data,
    loading,
  };
};

export default useStreamCollection;
