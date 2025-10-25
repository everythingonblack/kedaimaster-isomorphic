'use client';

import ProductDetailsRelatedProducts from '@/app/shared/ecommerce/product/product-details-related-products';
import ProductDetailsDescription from '@/app/shared/ecommerce/product/product-details-description';
import ProductDeliveryOptions from '@/app/shared/ecommerce/product/product-delivery-options';
import ProductDetailsGallery from '@/app/shared/ecommerce/product/product-details-gallery';
import ProductDetailsSummery from '@/app/shared/ecommerce/product/product-details-summery';
import ProductDetailsReview from '@/app/shared/ecommerce/product/product-details-review';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  gallery: { id: string; url: string; }[];
  category: string;
  sku: string;
  stock: number;
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {

  return (
    <div className="@container">
      <div className="@3xl:grid @3xl:grid-cols-12">
        <div className="col-span-7 mb-7 @container @lg:mb-10 @3xl:pe-10">
          <ProductDetailsGallery />
        </div>
        <div className="col-span-5 @container">
          <ProductDetailsSummery product={product} />
          <ProductDeliveryOptions />
          <ProductDetailsDescription />
          <ProductDetailsReview />
        </div>
      </div>
      <ProductDetailsRelatedProducts />
    </div>
  );
}
