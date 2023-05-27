import { HTMLAttributes, ReactNode, useCallback } from 'react';
import styles from '../../styles/components/utilities/Typography.module.scss';

type TypographyVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body';
type TypographyIntrinsicElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
type TypographyBoldIntrinsicElements = 'strong' | 'b';

type TypographyElements = HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement;

type TypographyVariantElementMapping = Record<TypographyVariants, TypographyIntrinsicElements>;
type TypographyVariantClassMapping = Record<TypographyVariants, string>;

interface TypographyProps extends HTMLAttributes<TypographyElements> {
  children: ReactNode;

  variant?: TypographyVariants;

  isParagraph?: boolean;

  isBold?: boolean;

  boldElement?: TypographyBoldIntrinsicElements;
}

const variantElementMapping: TypographyVariantElementMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'span',
};

const variantClassMapping: TypographyVariantClassMapping = {
  h1: styles['typography--headingOne'],
  h2: styles['typography--headingTwo'],
  h3: styles['typography--headingThree'],
  h4: styles['typography--headingFour'],
  h5: styles['typography--headingFive'],
  h6: styles['typography--headingSix'],
  body: '',
};

const Typography = (props: TypographyProps): JSX.Element => {
  const {
    variant = 'body',
    isBold,
    boldElement: BoldElement = 'b',
    isParagraph,
    children,
    className: propClassName,
    ...rest
  } = props;

  const RootElement = isParagraph ? 'p' : variantElementMapping[variant];

  const getClassName = useCallback((): string => {
    return [
      variantClassMapping[variant] || '',
      isParagraph ? styles['typography--paragraph'] : '',
      propClassName || '',
    ].join(' ');
  }, [variant, propClassName]);

  return (
    <RootElement
      className={getClassName()}
      {...rest}
    >
      {
        isBold ? (
          <BoldElement className={styles.typography__bold}>{ children }</BoldElement>
        ) : children
      }
    </RootElement>
  );
};

export default Typography;
