import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, IconArrowDown } from './style';

type TypeSelect<T> = {
  data: T[];
  selectValue: string;
  onClickSelect?: (value: any) => void;
  onClickItem?: (value: T) => void;
  disable?: boolean;
};

export const Select = <T extends { name: string }>({
  data,
  onClickSelect,
  onClickItem,
  selectValue,
  disable,
}: TypeSelect<T>): JSX.Element => {
  const selectRef = useRef<HTMLDivElement>(null);

  const [currentValue, setCurrentValue] = useState(selectValue);
  const [selectActive, setActiveSelect] = useState(false);

  const handleClickSelect = useCallback(
    (value: any) => {
      if (!disable && data.length > 0) {
        setActiveSelect(!selectActive);
        if (onClickSelect) onClickSelect(value);
      }
    },
    [selectActive],
  );

  const handleClickRow = useCallback(
    (value: any) => {
      if (onClickItem) onClickItem(value);
    },
    [currentValue],
  );

  useEffect(() => {
    setCurrentValue(selectValue);
  }, [selectValue]);

  useEffect(() => {
    document.addEventListener('click', (event: any) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setActiveSelect(false);
      }
    });
  }, []);

  return (
    <Container
      onClick={() => {
        handleClickSelect(currentValue);
      }}
      isActive={selectActive}
      ref={selectRef}
      className="form-control"
      disable={!!disable}
    >
      <header>
        <div>{currentValue}</div>
        <IconArrowDown />
      </header>
      <ul>
        {data.map(current => (
          <li
            onClick={() => {
              handleClickRow(current);
            }}
          >
            {current.name}
          </li>
        ))}
      </ul>
    </Container>
  );
};
