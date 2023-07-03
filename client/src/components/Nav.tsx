import { styled } from 'styled-components';
import { useAtom } from 'jotai';
import { menuAtom } from 'jotai/atom';

export const Nav = () => {
  // 마켓, 커뮤니티 여부
  const isShop = true;

  const [currentMenu, setCurrentMenu] = useAtom(menuAtom);

  const shopMenuArr = ['NEW', 'BEST', 'SALE'];
  const communityMenuArr = ['챌린지', '그린나래지도'];

  const selectMenuHandler = (menu: string) => {
    setCurrentMenu(menu);
  };

  return (
    <>
      <NavWrapper>
        {isShop
          ? shopMenuArr.map((menu) => {
              return (
                <Menu
                  key={menu}
                  className={currentMenu === menu ? 'focused' : null}
                  onClick={() => selectMenuHandler(menu)}
                >
                  {menu}
                </Menu>
              );
            })
          : communityMenuArr.map((menu) => {
              return (
                <Menu
                  key={menu}
                  className={currentMenu === menu ? 'focused' : null}
                  onClick={() => selectMenuHandler(menu)}
                >
                  {menu}
                </Menu>
              );
            })}
      </NavWrapper>
    </>
  );
};

const NavWrapper = styled.ul`
  top: 0;
  position: sticky;
  z-index: 1;

  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: var(--white);
  border-bottom: 0.1rem solid var(--gray);
  list-style: none;
  padding: 0 2rem;
`;

const Menu = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 10rem;
  height: 3rem;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }

  &.focused {
    font-weight: bold;
  }
`;
