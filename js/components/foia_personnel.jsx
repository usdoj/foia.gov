/* eslint-disable  react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

// Titles that are considered glossary terms and should be highlighted as such.
const titleGlossaryTerms = [
  'FOIA Requester Service Center',
  'FOIA Public Liaison',
];

function titleIsGlossaryTerm(title) {
  return titleGlossaryTerms.includes(title);
}

function displayName(foiaPersonnel) {
  const { name } = foiaPersonnel;
  let { title } = foiaPersonnel;

  if (titleIsGlossaryTerm(title)) {
    // Highlight the title as a glossary term
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    title = <span data-term={title.toLowerCase()} tabIndex="0">{title}</span>;
  }

  if (name && title) {
    return (
      <span>
        {name},  {title}
      </span>
    );
  }

  return name || title;
}

function FoiaPersonnel({ foiaPersonnel }) {
  if (!foiaPersonnel) {
    // TODO this shouldn't happen, but we don't have complete data yet
    return null;
  }

  const email = (foiaPersonnel.email || '').toLowerCase();
  const name = displayName(foiaPersonnel);
  return (
    <div>
      { name && <p className="agency-info_personnel">{name}</p> }
      {
        (foiaPersonnel.phone || [])
          .map((phone) => <p className="agency-info_phone" key={phone}>{ phone }</p>)
      }
      { foiaPersonnel.email
        && (
        <p className="agency-info_email">
          <a href={`mailto:${email}`} tabIndex={0}>{ email }</a>
        </p>
        )}
    </div>
  );
}

FoiaPersonnel.propTypes = {
  // TODO foiaPersonnel: PropTypes.object.isRequired,
  foiaPersonnel: PropTypes.object,
};

FoiaPersonnel.defaultProps = {
  foiaPersonnel: null,
};

export default FoiaPersonnel;
