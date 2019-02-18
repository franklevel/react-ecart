import React from "react";
import { Nav, ListGroup, ListGroupItem } from "reactstrap";

const items = [
  {
    href: "#",
    text: "Item"
  },
  {
    href: "#",
    text: "Item"
  },
  {
    href: "#",
    text: "Item"
  },
  {
    href: "#",
    text: "Item"
  },
  {
    href: "#",
    text: "Item"
  },
  {
    href: "#",
    text: "Item"
  },
  {
    href: "#",
    text: "Item"
  },
  {
    href: "#",
    text: "Item"
  },
  {
    href: "#",
    text: "Item"
  }
];

export default class Sidebar extends React.Component {
  render() {
    return (
      <Nav id="sidebar">
        <div className="sidebar-header">
          <h3>Bootstrap Sidebar</h3>
          <strong>BS</strong>
        </div>
        <ul className="list-unstyled components">
          {items && items.length > 0
            ? items.map((i, k) => {
                return (
                  <li>
                    <a>Uno</a>
                  </li>
                );
              })
            : null}
        </ul>
      </Nav>
    );
  }
}
