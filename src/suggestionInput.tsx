import React, {RefObject} from 'react';

const getDisplayName = (WrappedComponent: any) => (
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
);

export interface SuggestionInputHocProps {
  addEventListener: () => void;
  removeEventListener: () => void;
  boxTopPosition: number | null;
  onKeyPress: (
    event: React.KeyboardEvent<any>,
    listLength: number,
    handleSelectElement: (e: React.KeyboardEvent<any>) => void,
    scrollContainer: RefObject<HTMLElement>,
  ) => void;
  selectedListIndex: number;
  setTarget: (node: HTMLDivElement) => void;
  checkHeight: () => void;
  offset: number | null;
}

interface State {
  selectedListIndex: number;
  boxTopPosition: number | null;
  offset: number | null;
}

export const suggestionInputHoc = <P extends object>(
  WrappedComponent: React.ComponentType<P & SuggestionInputHocProps>,
) =>
  class SuggestionInput extends React.Component<P, State> {
    elementHeight = 60;

    targetNode: (HTMLDivElement | null) = null;
    displayName: string = `SuggestedInput(${getDisplayName(WrappedComponent)})`;
    state = {
      selectedListIndex: -1,
      boxTopPosition: null,
      offset: null,
    };

    addEventListener = () => {
      window.addEventListener('scroll', this.checkHeight);
    }

    removeEventListener = () => {
      window.removeEventListener('scroll', this.checkHeight);
    };

    increaseListIndex = (num: number) => {
      this.setState((prevState: State) => ({selectedListIndex: prevState.selectedListIndex + num}));
    }

    scrollUp(scrollContainer: RefObject<HTMLElement>, listLength: number) {
      const tmpContainer = scrollContainer.current;
      if (listLength > 0 && tmpContainer) {
        const topOffsetElements = Math.ceil(tmpContainer.scrollTop / this.elementHeight);
        if (this.state.selectedListIndex === topOffsetElements) {
          tmpContainer.scrollTop = (topOffsetElements - 1) * this.elementHeight;
        }
      }
    }

    scrollDown(scrollContainer: RefObject<HTMLElement>, listLength: number) {
      const tmpContainer = scrollContainer.current;
      if (listLength > 0 && tmpContainer) {
        const containerHeight = tmpContainer.offsetHeight;
        const maxFullContainElements = Math.floor(containerHeight / this.elementHeight);
        const splittedElementHeight = containerHeight % this.elementHeight;
        const needToScroll = this.elementHeight - splittedElementHeight;
        if (maxFullContainElements - 1 === this.state.selectedListIndex) {
          tmpContainer.scrollTop = needToScroll;
        }
        if (maxFullContainElements - 1 < this.state.selectedListIndex) {
          tmpContainer.scrollTop += this.elementHeight;
        }
      }
    }

    onKeyPress = (
      event: React.KeyboardEvent<any>,
      listLength: number,
      handleSelectElement: (e: React.KeyboardEvent<any>) => void,
      scrollContainer: RefObject<HTMLElement>,
    ) => {
      switch (event.key) {
        case 'ArrowDown': {
          this.scrollDown(scrollContainer, listLength);
          if (this.state.selectedListIndex === -1) {
            this.setState({selectedListIndex: 0});
          } else if (this.state.selectedListIndex < listLength - 1) {
            this.increaseListIndex(1);
          }
          break;
        }
        case 'ArrowUp': {
          this.scrollUp(scrollContainer, listLength);
          if (this.state.selectedListIndex > 0) {
            this.increaseListIndex(-1);
          }
          break;
        }
        case 'Enter': {
          event.preventDefault();
          if (this.state.selectedListIndex !== -1) {
            handleSelectElement(event);
            this.setState({selectedListIndex: -1});
          }
          break;
        }
        default:
          break;
      }
    }

    setTargetNode = (node: HTMLDivElement) => {
      this.targetNode = node;
    }

    checkHeight = async () => {
      const node = this.targetNode;
      if (node) {
        const rect = node.getBoundingClientRect();
        const boxTopPosition = rect.top + rect.height + 55;
        const offset = rect.top;
        if (this.state.boxTopPosition !== boxTopPosition) {
          await this.setState({boxTopPosition});
        }
        if (this.state.offset !== offset) {
          await this.setState({offset});
        }
      }
    }


    render() {
      return (
        <WrappedComponent
          addEventListener={this.addEventListener}
          removeEventListener={this.removeEventListener}
          boxTopPosition={this.state.boxTopPosition}
          onKeyPress={this.onKeyPress}
          selectedListIndex={this.state.selectedListIndex}
          setTarget={this.setTargetNode}
          checkHeight={this.checkHeight}
          offset={this.state.offset}
          {...this.props}
        />
      );
    }
  }

