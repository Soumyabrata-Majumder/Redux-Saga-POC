import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadImages } from '../../actions';
import Stats from '../Stats';

import './styles.css';

class ImageGrid extends Component {
    componentDidMount() {
        this.props.loadImages();
    }

    render() {
        const { images, isLoading, error, loadImages, stats } = this.props;
        return (
            <div className="content">
                <section className="grid">
                    {images.length &&
                        images.map(image => (
                            <div
                                key={image.id}
                                className={`item item-${Math.ceil(
                                    image.height / image.width,
                                )}`}
                            >
                                <Stats stats={stats[image.id]} />
                                <img
                                    src={image.urls.small}
                                    alt={image.user.username}
                                />
                            </div>
                        ))}
                </section>
                {error && <div className="error">{JSON.stringify(error)}</div>}
                <button disabled={isLoading} onClick={loadImages}>
                    {isLoading ? 'loading...' : 'load more images'}
                </button>
            </div>
        );
    }
}

const mapStateToProps = ({ images, isLoading, error, stats }) => ({
    images,
    isLoading,
    error,
    stats,
});

const mapDispatchToProps = dispatch => ({
    loadImages: () => dispatch(loadImages()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ImageGrid);
