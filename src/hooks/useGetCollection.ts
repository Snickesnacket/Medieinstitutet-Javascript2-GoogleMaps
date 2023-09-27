import { CollectionReference, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

const useGetCollection = <T>(colRef: CollectionReference<T>) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    setLoading(true);

    const snapshot = await getDocs(colRef); // where här

    const data: T[] = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        _id: doc.id,
      };
    });

    setData(data);
    setLoading(false);
  }, [colRef]);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    data,
    getData,
    loading,
  };
};

export default useGetCollection;
