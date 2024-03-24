import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Product } from "../../../pages/admin/adminPanelProducts";
import ModalConfirmDelete from "../../modals/modalConfirmDelete";
import { deleteProduct } from "../../../api/deleteProduct";
import { ModalEditProduct } from "../../modals/modalEditProduct";
import { updateProduct } from "../../../api/updateProducts";
import { fetchProductById } from "../../../api/fetchProductsById";

export default function ProductTable({
  _id,
  name,
  thumbnail,
  price,
  quantity,
  description,
}: Product) {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const { data: productIdData } = useQuery([`ProductId`, _id], () =>
    fetchProductById(_id)
  );

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    queryClient.invalidateQueries(["products"]);
    setShowModal(false);
  };

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  const saveEditedProduct = async (productData: Product) => {
    await updateProduct(productData._id, productData);
    queryClient.invalidateQueries(["products"]);
    setShowEditModal(false);
  };

  return (
    <>
      <tr key={_id}>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
          <img
            src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
            alt={name}
            className="w-32 object-contain m-auto"
          />
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
          {name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
          <p className="font-IRANSans">
            {productIdData?.data?.product?.category?.name}/
            {productIdData?.data?.product?.subcategory?.name}
          </p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
          <button
            onClick={() =>
              handleEdit({
                _id,
                name,
                thumbnail,
                description,
                category: productIdData?.data?.product?.category?.name,
                subcategory: productIdData?.data?.product?.subcategory?.name,
                price,
                quantity,
                brand: "",
                images: [],
              })
            }
            className="text-violet-600 hover:text-violet-900"
          >
            ویرایش
          </button>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="text-violet-600 hover:text-violet-900"
          >
            حذف
          </button>
        </td>
      </tr>
      {showModal && (
        <ModalConfirmDelete
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => handleDelete(_id)}
        />
      )}
      {showEditModal && currentProduct && (
        <ModalEditProduct
          isOpen={showEditModal}
          product={currentProduct}
          onSave={saveEditedProduct}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}


