import { CollectionReference, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamCollection = <T>(colRef: CollectionReference<T>) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      console.log("Got me some data 🤑");
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
