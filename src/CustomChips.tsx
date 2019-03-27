import React, { FC, useRef, useState } from 'react';

import SearchInput from './SearchInput';
import { ChipData, RemovableChipData } from './chip.interface';
import SampleChip from './SampleChip';
import { ChipsInputContainer, ChipsWrapper } from './chip.styles';
import SampleListItem from './SampleListItem';

interface Props {
  renderChip: (chipp: RemovableChipData) => JSX.Element;
  renderItem: (selected: boolean, value: ChipData, handleSelect: (val: ChipData) => void) => JSX.Element;
  onChange: (item: ChipData[]) => void;
  inputPlaceholder: string;
  chipsData: ChipData[];
  emptyMessage: string;
  fetchSearchSuggestions?: (value: string) => Promise<ChipData[]>;
  searchIcon?: JSX.Element;
  suggestionList?: ChipData[];
  chipsWrapperClassName?: string;
}

const CustomChips: FC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chipsData, setChipsData] = useState(props.chipsData);

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const tmpTarget = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && tmpTarget.value === '') {
      const tmpChipsData = [...chipsData];
      tmpChipsData.pop();
      setChipsData(tmpChipsData);
      props.onChange(tmpChipsData);
    }
  };

  const addItem = (item: ChipData) => {
    if (!chipsData.some((chip) => chip.id === item.id)) {
      const tmpChipsData = [...chipsData];
      tmpChipsData.push(item);
      setChipsData(tmpChipsData);
      props.onChange(tmpChipsData);
    }
  };

  const removeChip = (chip: ChipData) => {
    const tmpChipsData = [...chipsData];
    const filteredData = tmpChipsData.filter((item) => item.id !== chip.id);
    setChipsData(filteredData);
    props.onChange(filteredData);
  };

  const renderChip = (chip: ChipData) => {
    const tmpChip: RemovableChipData = {
      ...chip,
      onRemove: removeChip,
    };
    return props.renderChip(tmpChip);
  };

  const inputSetting = (input: HTMLInputElement) => {
    inputRef.current = input;
  };

  const onKeyDownItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyPress(event);
  };

  const onClickItem = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <ChipsInputContainer
      onKeyDown={onKeyDownItem}
      onClick={onClickItem}
      className={props.chipsWrapperClassName}
    >
      <div>{props.searchIcon}</div>
      <ChipsWrapper>
        {chipsData && chipsData.map((item) => (
            renderChip(item)
        ))}
        <SearchInput
          fetchSearchSuggestions={props.fetchSearchSuggestions}
          suggestionList={props.suggestionList}
          minLength={1}
          inputClassName="chips-input"
          debounceTimeout={250}
          handleSelectElement={addItem}
          renderListItem={props.renderItem}
          setInputRef={inputSetting}
          inputPlaceholder={props.inputPlaceholder}
          emptyMessage={props.emptyMessage}
        />
      </ChipsWrapper>
    </ChipsInputContainer>
  );
};

CustomChips.defaultProps = {
  searchIcon: <div>Search</div>,
  chipsData: [],
  suggestionList: [],
  renderChip: (value: RemovableChipData) => (<SampleChip key={value.id} value={value} />),
  renderItem: (selected: boolean, value: ChipData, handleSelect: (val: ChipData) => void) => (
    <SampleListItem value={value} selected={selected} handleSelect={handleSelect} />
  ),
};

export default CustomChips;
