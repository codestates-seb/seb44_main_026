import { useAtomValue } from 'jotai';
import { menuAtom } from 'jotai/atom';

export const ItemList = () => {
  const currentMenu = useAtomValue(menuAtom);

  return <>{currentMenu}</>;
};
