import { Box, Image, Skeleton } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { add } from 'redux/features/cartSlice';
import classes from './productCard.module.css';
import { AddIcon } from '@chakra-ui/icons';
import useTranslation from 'next-translate/useTranslation';
import { BsStarFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { ProductCardProps } from 'model';

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const { image, title, price, rating, description } = product;
  const { t } = useTranslation();

  const addToCart = () => {
    dispatch(add(product));
    toast.success(t('common:addedToCart'), {
      position: 'top-right',
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  return (
    <div className={classes.productCard}>
      <Box position="relative">
        <Image
          className={classes.productCardImage}
          src={image}
          alt={title}
          height="75px"
          width="75px"
          draggable="false"
          fallback={<Skeleton />}
          boxShadow="lg"
          borderRadius="xl"
          loading="lazy"
        />
      </Box>

      <div className={classes.productCardInfo}>
        <div>
          <h3 className={classes.productCardTitle}>{title.substring(0, 20)}</h3>

          <div className={classes.productCardDescription}>
            {description.substring(0, 40)}...
          </div>

          <div className={classes.productCardRating}>
            <BsStarFill color="#ECD03F" />
            {rating?.rate}
          </div>

          <div className={classes.productCardPrice}>
            {t('common:price')} {price} TL
          </div>
        </div>

        <div>
          <button onClick={addToCart} className={classes.productCardCta}>
            <span>
              <AddIcon w={6} h={6} color="#0078E3" />
            </span>
            {t('common:addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
