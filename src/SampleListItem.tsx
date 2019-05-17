import React, { FC } from 'react';
import styled from 'styled-components';

import { ChipData } from './chip.interface';

const ListItem = styled.div<{ selected: boolean; preSelected: boolean; }>`
  background-color: ${({ selected, preSelected }) => (
    preSelected ? 'lightgrey' : selected ? 'grey' : 'white'
  )};
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
  preSelected: boolean;
}

const SampleListItem: FC<Props> = ({ value, handleSelect, selected, preSelected }) => {
  const selectItem = () => handleSelect(value);
  return (
    <div>
      <ListItem preSelected={preSelected} selected={selected} onClick={selectItem}>{value.name}</ListItem>
    </div>
  );
};

export default SampleListItem;
