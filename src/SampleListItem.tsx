import React, { FC } from 'react';

import { ChipData } from './chip.interface';

interface Props {
  value: ChipData;
  selected: boolean;
  handleSelect: (val: ChipData) => void;
  preSelected: boolean;
}

const SampleListItem: FC<Props> = ({ value, handleSelect, selected, preSelected }) => {
  const selectItem = () => handleSelect(value);
  return (
    <div
      className={`list_item ${preSelected ? 'pre_selected' : ''} ${selected ? 'selected' : ''}`}
      onClick={selectItem}
    >
      {value.name}
    </div>
  );
};

export default SampleListItem;
