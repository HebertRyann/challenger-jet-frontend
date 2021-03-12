import React from 'react';
import { Link } from 'react-router-dom';

interface Breadcrumb {
  name: string;
  to?: string;
}

interface Tools {
  name: string;
  to: string;
  icon: string;
  modal: boolean;
  handleDelete(): void;
  onClick?: () => void;
}

interface ContainerProps {
  pageTitle: string;
  portletTitle: string;
  breadcrumb?: Breadcrumb[];
  tools?: Tools[];
}

const Container: React.FC<ContainerProps> = ({
  pageTitle,
  portletTitle,
  breadcrumb,
  tools,
  children,
}) => {
  const handlerOnClickTolls = (funtion: VoidFunction | undefined) => {
    if (funtion !== undefined) {
      funtion();
    }
  };

  return (
    <div className="page-content-wrapper">
      <div className="page-head">
        <div className="container-fluid">
          <div className="page-title">
            <h1>{pageTitle}</h1>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="container-fluid">
          {breadcrumb && (
            <ul className="page-breadcrumb breadcrumb">
              {breadcrumb.map((bread, i) => (
                <li key={bread.name}>
                  {(bread.to && <Link to={bread.to}>{bread.name}</Link>) ||
                    bread.name}
                  {breadcrumb.length !== i + 1 && (
                    <i className="fa fa-circle" />
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="page-content-inner">
            <div className="mt-content-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="portlet light bordered">
                    <div className="portlet-title">
                      <div className="caption">{portletTitle}</div>
                      {tools && (
                        <div className="tools">
                          {tools.map(
                            tool =>
                              (tool.handleDelete && (
                                <Link
                                  key={tool.name}
                                  to="#!"
                                  onClick={() => tool.handleDelete()}
                                >
                                  <i className={tool.icon} /> {tool.name}
                                </Link>
                              )) || (
                                <div key={Math.random()}>
                                  {tool.modal ? (
                                    <div
                                      style={{
                                        cursor: 'pointer',
                                      }}
                                      onClick={() =>
                                        handlerOnClickTolls(tool.onClick)
                                      }
                                    >
                                      <i className={tool.icon} /> {tool.name}
                                    </div>
                                  ) : (
                                    <Link
                                      style={{
                                        cursor: 'pointer',
                                      }}
                                      onClick={() => {
                                        console.log(tool.modal);
                                      }}
                                      key={tool.name}
                                      to={tool.to}
                                    >
                                      <i className={tool.icon} /> {tool.name}
                                    </Link>
                                  )}
                                </div>
                              ),
                          )}
                        </div>
                      )}
                    </div>
                    <div className="portlet-body form">{children} </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
