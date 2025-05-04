import React from "react";
import { Form } from "react-bootstrap";
import { List } from "./styles";

interface Props {
  children: any;
  style: Object;
  className?: string;
  labeledBy?: string;
  maxLength?: number;
  search: string;
  handleSearch: (text: string) => void;
}

const Menu = React.forwardRef(
  (
    {
      children,
      style,
      className,
      maxLength = 100,
      labeledBy,
      search,
      handleSearch,
    }: Props,
    ref: React.LegacyRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...style,
          minWidth: "100%",
        }}
        aria-labelledby={labeledBy}
      >
        <div className="mx-3 my-2">
          <Form.Control
            autoFocus
            placeholder="Type to search..."
            onChange={(event) => handleSearch(event.target.value)}
            value={search}
            maxLength={maxLength}
          />
        </div>

        <List>{children.length > 0 && children}</List>
        {children.length === 0 && (
          <div className="text-center">No results found.</div>
        )}
      </div>
    );
  }
);

export default Menu;
