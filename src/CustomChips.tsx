import React, { FC, useEffect, useRef, useState } from 'react';

import SearchInput from './SearchInput';
import { ChipData, RemovableChipData } from './chip.interface';
import SampleChip from './SampleChip';
import { ChipsInputContainer, ChipsWrapper } from './chip.styles';
import SampleListItem from './SampleListItem';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
      // tslint:disable-next-line:max-line-length
      d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

interface Props {
  renderItem: (selected: boolean, value: ChipData, handleSelect: (val: ChipData) => void) => JSX.Element;
  onChange: (item: ChipData[]) => void;
  renderChip?: (chip: RemovableChipData) => JSX.Element;
  chipsData?: ChipData[];
  inputPlaceholder?: string;
  emptyMessage?: string;
  fetchSearchSuggestions?: (value: string) => Promise<ChipData[]>;
  searchIcon?: JSX.Element;
  suggestionList?: ChipData[];
  chipsWrapperClassName?: string;
}

const CustomChips: FC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chipsData, setChipsData] = useState(props.chipsData || []);

  useEffect(() => {
    setChipsData(props.chipsData || []);
  }, [props.chipsData]);

  const changeChips = (chips: ChipData[]) => {
    setChipsData(chips);
    props.onChange(chips);
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const tmpTarget = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && tmpTarget.value === '') {
      const tmpChipsData = [...chipsData];
      tmpChipsData.pop();
      changeChips(tmpChipsData);
    }
  };

  const addItem = (item: ChipData) => {
    if (!chipsData.some((chip) => chip.id === item.id)) {
      const tmpChipsData = [...chipsData, item];
      changeChips(tmpChipsData);
    }
  };

  const removeChip = (chip: ChipData) => {
    const tmpChipsData = [...chipsData];
    const filteredData = tmpChipsData.filter((item) => item.id !== chip.id);
    changeChips(filteredData);
  };

  const renderChip = (chip: ChipData) => {
    const tmpChip: RemovableChipData = {
      ...chip,
      onRemove: removeChip,
    };
    if (props.renderChip) {
      return props.renderChip(tmpChip);
    }
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

  const renderListItem = (selected: boolean, value: ChipData, handleSelect: (val: ChipData) => void) => {
    if (props.renderItem) {
      props.renderItem(selected, value, handleSelect);
    }
    return (
      <SampleListItem
        preSelected={chipsData.includes(value)}
        value={value}
        selected={selected}
        handleSelect={handleSelect}
      />
    );
  };

  return (
    <ChipsInputContainer
      onKeyDown={onKeyDownItem}
      onClick={onClickItem}
      className={props.chipsWrapperClassName}
    >
      <div>{props.searchIcon || <SearchIcon />}</div>
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
          renderListItem={renderListItem}
          setInputRef={inputSetting}
          inputPlaceholder={props.inputPlaceholder || 'Search'}
          emptyMessage={props.emptyMessage || 'empty'}
        />
      </ChipsWrapper>
    </ChipsInputContainer>
  );
};

CustomChips.defaultProps = {
  chipsData: [],
  suggestionList: [],
  emptyMessage: 'empty',
  inputPlaceholder: 'Search',
  renderChip: (value: RemovableChipData) => (<SampleChip key={value.id} value={value} />),
};

export default CustomChips;
