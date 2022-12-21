import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ApiDish} from "../../types";
import axiosApi from "../../axiosApi";
import DishForm from "../../components/DishForm/DishForm";

const EditDish = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState<ApiDish | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchOneDish = useCallback(async () => {
    const dishResponse = await axiosApi.get<ApiDish>('/dishes/' + id + '.json');
    setDish(dishResponse.data);
  }, [id]);

  useEffect(() => {
    void fetchOneDish();
  }, [fetchOneDish]);

  const updateDish = async (dish: ApiDish) => {
    try {
      setUpdating(true);
      await axiosApi.put('/dishes/' + id + '.json', dish);
      navigate('/');
    } finally {
      setUpdating(false);
    }
  }

  const existingDish = dish && {
    ...dish,
    price: dish.price.toString(),
  }

  return (
    <div className="row mt-2">
      <div className="col">
        {existingDish && <DishForm onSubmit={updateDish} existingDish={existingDish} isEdit isLoading={updating}/>}
      </div>
    </div>
  );
};

export default EditDish;