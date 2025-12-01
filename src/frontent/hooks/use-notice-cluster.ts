"use client";

import * as React from "react";

interface Elemento {
  cluster: number;
  link: string;
  title: string;
  content: string;
  category: string;
  creation_date: string;
  image: string;
  inclinacion: string;
  explicacion_inclinacion: string;
}

interface GroupNotice {
  cluster: number;
  titulo: string;
  resumen_general: string;
  resumen_derecha: string;
  resumen_centro: string;
  resumen_izquierda: string;
  elementos: Elemento[];
}

interface State {
  data: GroupNotice[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: GroupNotice[] }
  | { type: "FETCH_ERROR"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function useClusterNotices(cluster: number | string) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const fetchData = React.useCallback(async () => {
    try {
      dispatch({ type: "FETCH_START" });
      const res = await fetch(`https://yuyariy-backend-production.up.railway.app/groupnotices/${cluster}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      const data: GroupNotice[] = await res.json();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err: any) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  }, [cluster]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}
