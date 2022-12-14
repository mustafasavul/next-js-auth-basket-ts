import * as React from 'react';
import { Text } from '@chakra-ui/react';
import { BsViewStacked, BsFilePerson } from 'react-icons/bs';
import classes from './sticky-navbar.module.css';

const StickyNavbar = () => {
  return (
    <div className={classes.stickyNavbar}>
      <a href="#orderSummary">
        <BsViewStacked fontSize="1.15rem" />

        <Text mt={2} fontSize="12px" color="#000">
          List
        </Text>
      </a>

      <a href="/profile">
        <BsFilePerson fontSize="1.15rem" />

        <Text mt={2} fontSize="12px" color="#000">
          Profile
        </Text>
      </a>
    </div>
  );
};

export default StickyNavbar;
