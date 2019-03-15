import React, { ChangeEvent, RefObject } from 'react';

import { ChipData } from "./chip.interface";
import { suggestionInputHoc, SuggestionInputHocProps } from "./suggestionInput";
import {
  InputContainer,
  NothingFoundContainer,
  ResultsContainer,
  SearchContainer,
  SearchInputContainer
} from "./chip.styles";

interface DefaultProps {
  inputClassName: string;
  setInputRef: (input: HTMLInputElement) => void;
  handleClickOutside?: (event: Event) => void;
  emptyMessage: string;
  inputPlaceholder: string;
}

interface OwnProps extends DefaultProps {
  fetchSearchSuggestions?: (value: string) => Promise<ChipData[]>;
  suggestionList?: ChipData[];
  minLength: number;
  debounceTimeout: number;
  handleSelectElement: (item: ChipData, callback?: () => void) => void;
  renderListItem: (selected: boolean, value: ChipData, handleSelect: (val: ChipData) => void) => JSX.Element;
  filter?: string;
}

interface State {
  hitList: ChipData[];
  loadingSuggestions: boolean;
  nothingFound: boolean;
}

type Props = OwnProps & SuggestionInputHocProps;

class SearchInput extends React.Component<Props, State> {
  static defaultProps: DefaultProps = {
    inputClassName: '',
    setInputRef: () => (null),
    handleClickOutside: () => (null),
    emptyMessage: 'empty',
    inputPlaceholder: 'Search',
  };

  inputNode: HTMLInputElement | null;
  inputContainerRef: RefObject<HTMLDivElement> | null;
  scrollContainerRef: RefObject<HTMLDivElement> | null;
  isUnmounted: boolean;

  constructor(props: Props) {
    super(props);
    this.state = {
      hitList: [],
      loadingSuggestions: false,
      nothingFound: false,
    };
    this.isUnmounted = false;
    this.inputNode = null;
    this.inputContainerRef = React.createRef<HTMLDivElement>();
    this.scrollContainerRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.props.checkHeight();
    if (this.inputContainerRef && this.inputContainerRef.current) {
      this.props.setTarget(this.inputContainerRef.current);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    this.props.removeEventListener();
    this.isUnmounted = true;
  }

  handleClickOutside = (event: Event) => {
    if (this.inputContainerRef) {
      const node = this.inputContainerRef.current;
      if (node && !node.contains(event.srcElement)) {
        if (!this.isUnmounted) {
          this.setState({nothingFound: false, hitList: []});
        }
        if (this.props.handleClickOutside) {
          this.props.handleClickOutside(event);
        }
      }
    }
  }

  clearAndHide = () => {
    if (this.state.nothingFound
      || this.state.hitList.length > 0
      || (this.inputNode && this.inputNode.value)
    ) {
      if (!this.isUnmounted) {
        this.setState({nothingFound: false, hitList: []});
        if (this.inputNode) {
          this.inputNode.value = '';
          this.inputNode.focus();
        }
      }
    }
  }

  selectClickedElement = async (value: ChipData) => {
    await this.props.handleSelectElement(value, this.clearAndHide);
    await this.clearAndHide();
  }

  selectCurrentElement = async () => {
    await this.props.handleSelectElement(
      this.state.hitList[this.props.selectedListIndex],
      this.clearAndHide,
    );
    await this.clearAndHide();
  }

  searchAction = async (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    if (!this.isUnmounted) {
      if (value.trim().length !== 0) {
        if (this.props.fetchSearchSuggestions) {
          await this.setState({ loadingSuggestions: true });
          await this.props.fetchSearchSuggestions(value)
            .then((list) => {
              if (list.length === 0) {
                this.setState({ nothingFound: true });
              } else {
                this.setState({ nothingFound: false });
              }
              this.setState({
                hitList: list,
                loadingSuggestions: false,
              });
              this.props.checkHeight();
            })
            .catch(() => {
              this.setState({ hitList: [] });
            });
        } else if (this.props.suggestionList) {
          this.setState({ nothingFound: false });
          this.setState({ hitList: this.props.suggestionList });
          this.props.checkHeight();
        }
      } else {
        this.setState({nothingFound: true, loadingSuggestions: false});
      }
    }
  }

  setNode = (inputNode: HTMLInputElement | null) => {
    if (inputNode) {
      this.inputNode = inputNode;
      if (this.props.setInputRef) {
        this.props.setInputRef(inputNode);
      }
    }
  }

  onKeyDownItem = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (this.scrollContainerRef) {
      this.props.onKeyPress(
        event,
        this.state.hitList.length,
        this.selectCurrentElement,
        this.scrollContainerRef,
      );
    }
  }

  render() {
    const {emptyMessage, inputPlaceholder} = this.props;
    return (
      <InputContainer
        ref={this.inputContainerRef}
        onKeyDown={this.onKeyDownItem}
      >
        <SearchContainer>
          <SearchInputContainer>
            <input
              ref={this.setNode}
              className={this.props.inputClassName}
              placeholder={inputPlaceholder}
              onChange={this.searchAction}
              onFocus={this.props.addEventListener}
              onBlur={this.props.removeEventListener}
            />
          </SearchInputContainer>
          <ResultsContainer
            style={{maxHeight: `calc(100vh - ${(this.props.boxTopPosition || '100')}px)`,}}
            ref={this.scrollContainerRef}
          >
            {this.state.loadingSuggestions ? (
              <div>
                <NothingFoundContainer>
                  <div>LOAAAADING...</div>
                </NothingFoundContainer>
              </div>
            ) : (
              <div>
                {this.state.nothingFound
                  ? (
                    <NothingFoundContainer>
                      {emptyMessage}
                    </NothingFoundContainer>
                  )
                  : (
                    <span>
                      {this.state.hitList.map((item, index) => (
                        this.props.renderListItem(
                          this.props.selectedListIndex === index,
                          item,
                          this.selectClickedElement,
                        )
                      ))}
                    </span>
                  )}
              </div>
            )}
          </ResultsContainer>
        </SearchContainer>
      </InputContainer>
    );
  }
}

const SearchInputWrapped = suggestionInputHoc<OwnProps>(SearchInput);
export default SearchInputWrapped;
