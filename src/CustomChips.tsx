import React from 'react';

import SearchInput from './SearchInput';
import { ChipData, RemovableChipData } from './chip.interface';
import SampleChip from './SampleChip';
import { ChipsInputContainer, ChipsWrapper } from './chip.styles';


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
}

interface State {
  chipsData: ChipData[];
}

class CustomChips extends React.Component<Props, State> {
  static defaultProps = {
    searchIcon: <div>Search</div>,
    chipsData: [],
    suggestionList: [],
    renderChip: (value: RemovableChipData) => (<SampleChip key={value.id} value={value} />),
  };

  input: HTMLInputElement | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      chipsData: props.chipsData,
    };
  }

  onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && event.currentTarget.value === '') {
      const tmpChipsData = [...this.state.chipsData];
      tmpChipsData.pop();
      this.setState({ chipsData: tmpChipsData });
      this.props.onChange(tmpChipsData);
    }
  }

  addItem = (item: ChipData) => {
    console.log(item)
    const tmpChipsData = [...this.state.chipsData];
    tmpChipsData.push(item);
    this.setState({ chipsData: tmpChipsData });
    console.log(tmpChipsData);
    this.props.onChange(tmpChipsData);
  }

  removeChip = (chip: ChipData) => {
    const tmpChipsData = [...this.state.chipsData];
    const filteredData = tmpChipsData.filter((item) => item.id !== chip.id);
    this.setState({ chipsData: filteredData });
    this.props.onChange(filteredData);
  }

  renderChip = (chip: ChipData) => {
    const tmpChip: RemovableChipData = {
      ...chip,
      onRemove: this.removeChip,
    };
    return this.props.renderChip(tmpChip);
  }

  inputSetting = (input: HTMLInputElement) => {
    this.input = input;
  }

  onKeyDownItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
    this.onKeyPress(event);
  }

  onClickItem = () => {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    return (
      <ChipsInputContainer
          onKeyDown={this.onKeyDownItem}
          onClick={this.onClickItem}
      >
        <div>{this.props.searchIcon}</div>
        <ChipsWrapper>
          {this.state.chipsData && this.state.chipsData.map((item) => (
              this.renderChip(item)
          ))}
          <SearchInput
            fetchSearchSuggestions={this.props.fetchSearchSuggestions}
            suggestionList={this.props.suggestionList}
            minLength={1}
            inputClassName="chips-input"
            debounceTimeout={250}
            handleSelectElement={this.addItem}
            renderListItem={this.props.renderItem}
            setInputRef={this.inputSetting}
            inputPlaceholder={this.props.inputPlaceholder}
            emptyMessage={this.props.emptyMessage}
          />
        </ChipsWrapper>
      </ChipsInputContainer>
    );
  }
}
export default CustomChips;
