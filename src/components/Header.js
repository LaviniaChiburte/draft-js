/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function Header() {
  return (
    <div>
      <nav>
        <div className="nav-wrapper red lighten-2">
          <a href="/editorV1" className="brand-logo">
            DraftJS
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a
                href="/editorV1"
                className="waves-effect waves-light btn red lighten-1"
              >
                Editor V 1
              </a>
            </li>
            <li>
              <a
                href="/editorV2"
                className="waves-effect waves-light btn red lighten-1"
              >
                Editor V 2{/* <i class="material-icons right">cloud</i> */}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
