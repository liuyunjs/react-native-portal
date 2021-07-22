import React from 'react';
// @ts-ignore
import { unstable_RootTagContext as RootTagContext } from 'react-native';

export const useRootTag = (): number => React.useContext(RootTagContext);
