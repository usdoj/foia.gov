import React from 'react';
import PropTypes from 'prop-types';

import { dataUrlToAttachment } from '../util/attachment';

function dataUrlToFileInfo(dataUrl) {
  const [attachment] = dataUrlToAttachment(dataUrl);
  if (!attachment) {
    return null;
  }

  return {
    name: attachment.filename,
    type: attachment.content_type,
    size: attachment.filesize,
  };
}


function parseFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const [properties, filedata] = reader.result.split(',');

      // Add filename and size to data-url
      const augementedProperites = [
        properties,
        `filename=${encodeURIComponent(file.name)}`,
        `filesize=${file.size}`,
      ].join(';');

      resolve([augementedProperites, filedata].join(','));
    });

    reader.addEventListener('error', () => {
      reject(reader.error);
    });

    reader.readAsDataURL(file);
  });
}


class FoiaFileWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value, // dataUrl
      fileInfo: dataUrlToFileInfo(props.value),
    };
  }

  render() {
    const onChange = (e) => {
      parseFile(e.target.files[0])
        .then((dataUrl) => {
          this.setState({
            value: dataUrl,
            fileInfo: dataUrlToFileInfo(dataUrl),
          }, () => {
            this.props.onChange(dataUrl);
          });
        });
    };

    const {
      disabled,
      id,
      readonly,
    } = this.props;

    const { name, type, size } = this.state.fileInfo || {};
    return (
      <div>
        <input
          id={id}
          type="file"
          disabled={readonly || disabled}
          onChange={onChange}
          defaultValue=""
        />
        { this.state.fileInfo &&
          <div><strong>{name}</strong> ({type}, {size} bytes)</div>
        }
      </div>
    );
  }
}

FoiaFileWidget.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

FoiaFileWidget.defaultProps = {
  id: '',
  disabled: false,
  onChange: () => {},
  readonly: false,
  value: '',
};

export default FoiaFileWidget;
