import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import styled from 'styled-components'
import {
  HideOnScroll,
  MOBILE_VIEW_MAX_WIDTH,
  MOBILE_VIEW_HEADER_HEIGHT as MOBILE_CATEGORIES_BAR_HEIGHT,
  DESKTOP_VIEW_HEADER_HEIGHT as DESKTOP_CATEGORIES_BAR_HEIGHT,
  TWO_COL_MIN_WIDTH,
  HEADER_OPACITY,
} from '../utils/utils'
import { useGlobalContext } from '../../context'
import Chip from '@material-ui/core/Chip'

/** topbar under the search that shows category filter chips that scroll left/right */
const ChipsBar = () => {
  const { marginLeftToOffset } = useGlobalContext()
  const [activeChipIndex, setActiveChipIndex] = useState(0)

  return (
    <HideOnScroll>
      <ChipsContainer marginLeftToOffset={marginLeftToOffset}>
        <StyledTabs
          variant="scrollable"
          scrollButtons="off"
          // indicatorColor="none"
          textColor="primary"
          value={0}
        >
          <Chips {...{ activeChipIndex, setActiveChipIndex }} />
        </StyledTabs>
      </ChipsContainer>
    </HideOnScroll>
  )
}

export default ChipsBar

const Chips = ({ activeChipIndex, setActiveChipIndex }) => {
  return [...new Array(20)].map((_, index) => {
    return (
      <StyledChip
        key={`Chip #${index}`}
        label={`Chip #${index}`}
        // console says it's an error to have boolean value of true
        active={index === activeChipIndex ? `true` : null}
        onClick={() => setActiveChipIndex(index)}
        component="li"
      />
    )
  })
}

const StyledChip = styled(Chip)`
  /* active chip in desktop view has black background */
  && {
    margin-right: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: ${(props) =>
      props.active ? 'black' : 'rgba(0, 0, 0, 0.05)'};
    color: ${(props) => (props.active ? 'white' : '#030303')};
    &:hover,
    &:focus {
      background-color: black;
      color: white;
    }

    /* active chip in mobile view has grey background */
    @media screen and (max-width: ${MOBILE_VIEW_MAX_WIDTH}px) {
      background-color: ${(props) =>
        props.active ? '#606060' : 'rgba(0, 0, 0, 0.05)'};
      color: ${(props) => (props.active ? 'white' : '#030303')};

      &:hover,
      &:focus {
        background-color: #606060;
        color: white;
      }
    }
  }

  .MuiChip-label {
    padding: 0 12px;
    font-size: 0.875rem;
  }
`

const StyledTabs = styled(Tabs)`
  /* to make the tabs indicator invisible */
  .MuiTabs-indicator {
    background-color: transparent;
  }

  .MuiTabs-scrollable {
    display: flex;
    align-items: center;
    padding-left: 12px;

    @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
      padding-left: 24px;
    }
  }
`

const ChipsContainer = styled.div`
  height: ${MOBILE_CATEGORIES_BAR_HEIGHT}px;
  @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
    height: ${DESKTOP_CATEGORIES_BAR_HEIGHT}px;
    /* Header is using transition, so shouldn't disable here otherwise HideOnScroll not in sync */
    transition: none !important;
    opacity: ${HEADER_OPACITY};
  }
  width: calc(100vw - ${(props) => props.marginLeftToOffset}px);
  position: fixed;
  margin-left: ${(props) => props.marginLeftToOffset}px;
  background-color: white;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  z-index: 1000; // 100 less than AppBar, to show the AppBar shadow, as well as to prevent Avatar and IconButton appears on top of the ChipsBar

  /* This doesn't even show in dev-tool if defined under StyledTabs */
  .MuiTabs-root {
    height: 100%;
  }
`

// Unable to style the arrows as I like, thus not using
// const TabsWithArrows = styled(Tabs)`
//   .Mui-disabled {
//     /* width: 10px;
//     transition: all 0.2s cubic-bezier(0.05, 0, 0, 1); */
//     /* transform: scaleX(0.5);
//     transform: translateX(-20px); */
//   }

//   .MuiTabs-scrollable {
//     display: flex;
//     align-items: center;
//     /* padding-left: 1rem; */
//   }

//   .MuiTabs-scrollButtons:first-of-type {
//     /* background-color: red; */

//     &.Mui-disabled {
//       flex-shrink: 1;
//       transition: flex 0.3s ease;
//     }

//     &::before {
//       @media screen and (max-width: ${MOBILE_VIEW_MAX_WIDTH}px) {
//         height: calc(${MOBILE_CATEGORIES_BAR_HEIGHT}px - 4px);
//       }
//       height: calc(${DESKTOP_CATEGORIES_BAR_HEIGHT}px - 6px);
//       width: 50px;
//       position: fixed;
//       left: calc(40px + ${(props) => props.marginLeftToOffset}px);
//       pointer-events: none;
//       content: '';
//       /* doesn't do the fade out effect as intended */
//       background: linear-gradient(
//         to right,
//         white 20%,
//         rgba(255, 255, 255, 0) 80%
//       );
//       /* background-color: red; */
//     }
//   }
//   .MuiTabScrollButton-root:last-of-type {
//     /* background-color: yellow; */

//     &::before {
//       @media screen and (max-width: ${MOBILE_VIEW_MAX_WIDTH}px) {
//         height: calc(${MOBILE_CATEGORIES_BAR_HEIGHT}px - 4px);
//       }
//       height: calc(${DESKTOP_CATEGORIES_BAR_HEIGHT}px - 6px);
//       width: 50px;
//       position: fixed;
//       right: 40px;
//       content: '';
//       pointer-events: none;
//       background: linear-gradient(
//         to left,
//         white 20%,
//         rgba(255, 255, 255, 0) 80%
//       );
//     }
//   }
// `