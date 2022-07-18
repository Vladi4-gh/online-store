import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { Props } from './models/props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faStar } from '@fortawesome/free-solid-svg-icons';
import { ColorBox } from '../ColorBox';
import styles from './styles.scss';

export const GoodsGrid: React.FC<Props> = (props) => {
  const { width: goodsGridWidth, ref: goodsGridRef } = useResizeDetector({
    refreshMode: 'throttle',
    refreshRate: 100,
  });
  const goodItemMaxWidth = 400;
  const columnAmount = Math.floor((goodsGridWidth || 0) / goodItemMaxWidth) || 1;

  return (
    <section className={styles['goods-grid']} ref={goodsGridRef} style={{ gridTemplateColumns: `repeat(${columnAmount}, 1fr)` }}>
      {props.goods.map((good) => (
        <article key={good.id} className={styles['good-item']}>
          <div className={styles['content-wrapper']} onClick={() => props.onGoodItemClick && props.onGoodItemClick(good.id)}>
            <div className={styles['content']}>
              <div className={styles['header']}>
                <div className={styles['icon-container']}>{good.isPopular && <FontAwesomeIcon className={styles['star']} icon={faStar} title="Популярная подушка!" />}</div>
                <h5 className={styles['title']}>{good.name}</h5>
                <div className={styles['icon-container']}>{props.cart.includes(good.id) && <FontAwesomeIcon className={styles['cart']} icon={faCartArrowDown} title="В корзине!" />}</div>
              </div>
              <div className={styles['image-wrapper']}>
                <img src={`./static/content/images/${good.imageName}`} alt={good.name} />
              </div>
              <div>
                <div className={styles['description-row']}>
                  <div className={styles['description']}>{good.description}</div>
                </div>
                <div className={styles['description-row']}>
                  <div className={styles['color']}>
                    <span>Цвет</span>:{' '}
                    <span className={styles['color-box-wrapper']}>
                      <ColorBox color={good.color} />
                    </span>
                  </div>
                </div>
                <div className={styles['description-row']}>
                  <span>Размер</span>: <span className={styles['no-wrap']}>{good.size} см</span>
                </div>
                <div className={styles['description-row']}>
                  <span>Производитель</span>: {good.manufacturer} <span className={styles['no-wrap']}>({good.yearOfIssue} г)</span>
                </div>
                <div className={styles['description-row']}>
                  <span>Цена</span>: <span className={styles['no-wrap']}>{good.price} ₽</span>
                </div>
                <div className={styles['description-row']}>
                  <span>В наличии</span>: <span className={styles['no-wrap']}>{good.availableQuantity} шт</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
