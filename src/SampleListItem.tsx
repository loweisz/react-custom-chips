import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { ChipData } from './chip.interface';

const ListItem = styled.div<{ selected: boolean; }>`
  background-color: ${({ selected }) => selected ? 'grey' : 'white'};
  color: ${({ selected }) => selected ? 'white' : 'black'};
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

interface Props {
  value: ChipData;
  selected: boolean;
  handleSelect: (val: ChipData) => void;
}

const SampleListItem: FC<Props> = ({ value, handleSelect, selected }) => {
  const selectItem = () => handleSelect(value);
  return (
    <div>
    <ListItem selected={selected} onClick={selectItem}>{value.name}</ListItem>
    </div>
  );
};

export default SampleListItem;
