import { useEffect, useState } from "react";

export const useSelection = (items = []) => {
  const [selected, setSelected] = useState([]);
  const getItemIds = (arrayItems) => arrayItems.map((item) => item.id);

  useEffect(() => {
    setSelected([]);
  }, [items]);

  const handleSelectAll = () => {
    setSelected([...getItemIds(items)]);
  };

  const handleSelectOne = (item) => {
    setSelected((prevState) => [...prevState, item.id]);
  };
  const handleDeselectAll = () => {
    setSelected([]);
  };
  const handleDeselectOne = (item) => {
    setSelected((prevState) => {
      return prevState.filter((_item) => _item !== item.id);
    });
  };

  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected,
  };
};
