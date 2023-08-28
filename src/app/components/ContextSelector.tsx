import React from 'react';
import {
  MenuToggle,
  MenuFooter,
  MenuSearch,
  MenuSearchInput,
  Divider,
  InputGroup,
  InputGroupItem,
  Button,
  ButtonVariant,
  SearchInput,
  Dropdown,
  DropdownList,
  DropdownItem,
} from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';

type ItemData = {
  text: string;
  href?: string;
  isDisabled?: boolean | undefined;
};

type ItemArrayType = (ItemData | string)[];

export enum ContextSelectorVariants {
  DEFAULT = 'default',
  PLAIN = 'plain',
  PRIMARY = 'primary',
  PLAIN_TEXT = 'plainText',
  SECONDARY = 'secondary',
  TYPEAHEAD = 'typeahead',
}

type ContextSelectorProps = {
  items: ItemArrayType;
  onSelect: (itemId: string) => void;
  label?: string;
  variant?: ContextSelectorVariants;
  footer?: React.ReactNode;
  isDisabled?: boolean;
};
const ContextSelector: React.FC<ContextSelectorProps> = ({
  items,
  onSelect: selectCallback,
  label,
  variant = ContextSelectorVariants.DEFAULT,
  footer,
  isDisabled = false,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState(typeof items[0] === 'string' ? items[0] : items[0].text);
  const [filteredItems, setFilteredItems] = React.useState<ItemArrayType>(items);
  const [searchInputValue, setSearchInputValue] = React.useState<string>('');
  const menuRef = React.useRef<HTMLDivElement>(null);

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (ev: React.MouseEvent<Element, MouseEvent> | undefined, itemId: string | number | undefined) => {
    if (typeof itemId === 'number' || typeof itemId === 'undefined') {
      return;
    }
    setSelected(itemId.toString());
    selectCallback(itemId.toString());
    setIsOpen(!isOpen);
  };

  const onSearchInputChange = (value: string) => {
    setSearchInputValue(value);
  };

  const onSearchButtonClick = () => {
    const filtered =
      searchInputValue === ''
        ? items
        : items.filter((item) => {
            const str = typeof item === 'string' ? item : item.text;
            return str.toLowerCase().indexOf(searchInputValue.toLowerCase()) !== -1;
          });

    setFilteredItems(filtered || []);
    setIsOpen(true); // Keep menu open after search executed
  };

  const onEnterPressed = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearchButtonClick();
    }
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={(isOpen) => setIsOpen(isOpen)}
      onOpenChangeKeys={['Escape']}
      toggle={(toggleRef) => (
        <MenuToggle ref={toggleRef} onClick={onToggleClick} isExpanded={isOpen} variant={variant}>
          {label && label + ': '} {selected}
        </MenuToggle>
      )}
      ref={menuRef}
      id="context-selector"
      onSelect={onSelect}
      isScrollable
    >
      <MenuSearch>
        <MenuSearchInput>
          <InputGroup>
            <InputGroupItem isFill>
              <SearchInput
                value={searchInputValue}
                placeholder="Search"
                onChange={(_event, value) => onSearchInputChange(value)}
                onKeyPress={onEnterPressed}
                aria-labelledby="pf-v5-context-selector-search-button-id-1"
                isDisabled={isDisabled}
              />
            </InputGroupItem>
            <InputGroupItem>
              <Button
                variant={ButtonVariant.control}
                aria-label="Search menu items"
                id="pf-v5-context-selector-search-button-id-1"
                onClick={onSearchButtonClick}
              >
                <SearchIcon aria-hidden="true" />
              </Button>
            </InputGroupItem>
          </InputGroup>
        </MenuSearchInput>
      </MenuSearch>
      <Divider />
      <DropdownList>
        {filteredItems.map((item, index) => {
          const [itemText, isDisabled, href] =
            typeof item === 'string' ? [item, null, null] : [item.text, item.isDisabled || null, item.href || null];
          return (
            <DropdownItem
              itemId={itemText}
              key={index}
              isDisabled={isDisabled as boolean | undefined}
              to={href as string | undefined}
            >
              {itemText}
            </DropdownItem>
          );
        })}
      </DropdownList>
      {footer && <MenuFooter>{footer}</MenuFooter>}
    </Dropdown>
  );
};

export default ContextSelector;
