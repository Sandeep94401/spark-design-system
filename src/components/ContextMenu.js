import React from 'react';
import { SprkLink } from '@sparkdesignsystem/spark-react';
import classnames from 'classnames';

function ContextMenu({context, setContext, className}) {
  return (
    <div className="context-menu">
      <ul className={className}>
        <li>
          <SprkLink
            additionalClasses={classnames({'context-menu__item--active': context==='installing-spark'})}
            onClick={(e) => {e.preventDefault(); setContext('installing-spark');}}
            variant="simple"
            href="#nogo">Installing Spark</SprkLink>
        </li>
        <li>
          <SprkLink
            additionalClasses={classnames({'context-menu__item--active': context==='using-spark'})}
            onClick={(e) => {e.preventDefault(); setContext('using-spark');}}
            variant="simple"
            href="#nogo">Using Spark</SprkLink>
        </li>
        <li>
          <SprkLink
            additionalClasses={classnames({'context-menu__item--active': context==='principles'})}
            onClick={(e) => {e.preventDefault(); setContext('principles');}}
            variant="simple"
            href="#nogo">Principles</SprkLink>
        </li>
      </ul>
    </div>
  );
}

export default ContextMenu;
