import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import { NavLink } from 'react-router-dom';
import useBoundStore from "../../store/Store";
import { Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

const Navbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState('/');
  const { logoutService, user } = useBoundStore((state) => state);
  const onLogout = () => {
    logoutService();
  };

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const { classes, cx } = useStyles();


  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <MantineLogo size={28} />
        <Group spacing={5} className={classes.links}>
          
          <NavLink to="/"
          activeClassName={classes.linkActive}>
          <h4>Home</h4>
        </NavLink>
        {!!user && (
          <NavLink to="posts" 
          activeClassName={classes.linkActive}>
            {" "}
            <h4>Posts</h4>
          </NavLink>
        )}
        {!!user ? (
          <h4 className="logout" onClick={onLogout}>
            Logout
          </h4>
        ) : (
          <NavLink to="login"
          activeClassName={classes.linkActive}>
            <h4>Login</h4>
          </NavLink>
        )}
         <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size="lg"
        onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
        offLabel={<IconMoonStars color={theme.colors.gray[6]} size="1.25rem" stroke={1.5} />}
      />
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
      </Container>
    </Header>
  );
};

export default Navbar;
