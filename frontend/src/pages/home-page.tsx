import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurants } from "src/slices/restaurantsSlice";
import { RootState, AppDispatch } from "../store";
import { PageLayout } from "../components/page-layout";
import RestaurantCard from "src/components/cards/restaurant-card";

export const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants, loading, error } = useSelector(
    (state: RootState) => state.restaurants
  );

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <PageLayout>
      <>
        <h1 className="m-3 text-xl font-bold">This is the Home Page</h1>

        <div className="flex justify-center mx-5">
          <div className="flex flex-wrap justify-center gap-5">
            {restaurants.map((restaurant) => (
              <a href={`/restaurants/${restaurant.restaurant_id}`}>
                <RestaurantCard
                  key={restaurant.restaurant_id}
                  name={restaurant.name}
                  imageUrl={restaurant.thumbnail_image_url}
                  rating={restaurant.hygiene_rating}
                />
              </a>
            ))}
          </div>
        </div>

        <p className="block mt-52">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat illo
          fugiat libero natus tempora, itaque accusantium id repellendus quo
          iusto incidunt iste laudantium inventore? Repellendus iste commodi,
          pariatur quia dolore laboriosam quasi dolor enim, at error incidunt
          odit quas ipsum obcaecati eligendi illum facilis adipisci quidem eos
          excepturi? Ea repellendus laborum nihil odio eos, nobis eligendi
          tenetur voluptate laboriosam, pariatur excepturi ipsam iure quam
          ratione. Accusamus corporis at quo natus nulla dolore minima soluta
          maiores dolor ipsam, ab officia harum provident, placeat rerum
          assumenda aperiam vero nostrum nemo, facere non molestias quibusdam
          aliquam illum! Fugiat, quia explicabo voluptatibus quo laudantium
          ratione vero ea nobis alias iste quis neque quidem doloremque!
          Voluptatem, doloribus mollitia. Laboriosam architecto sunt fugit
          aliquam et fugiat numquam facilis sed! Itaque numquam veritatis
          blanditiis quam sed ullam, voluptates ipsum fuga explicabo assumenda
          animi, dolorem facere illum veniam corrupti asperiores consequatur,
          minus esse repellat incidunt cupiditate? Perspiciatis laboriosam,
          natus neque doloribus atque ea sint provident suscipit perferendis
          facilis, iusto qui blanditiis quos hic at repellendus ex dolor, dolore
          distinctio nulla voluptatibus nostrum? Distinctio doloribus odit
          obcaecati nam ipsa quo necessitatibus beatae similique maxime esse
          vero adipisci perferendis sunt nulla id, molestias molestiae,
          consequuntur accusantium voluptatum dolor hic? Magni minima nemo amet
          ut illum dignissimos aperiam asperiores voluptates, tenetur deserunt
          nulla at ab saepe obcaecati unde sint odio suscipit ducimus, tempore
          dolorum laudantium. Natus voluptas quidem culpa ea aliquid corrupti
          omnis dolorum eos consectetur eveniet dignissimos officiis maxime aut
          quia animi aliquam architecto veniam, quae exercitationem nemo
          deserunt autem! Consectetur, quisquam labore quas, neque, dolorem
          quaerat sit consequuntur magni eius sint alias minima suscipit. Quam
          laudantium amet suscipit ducimus tenetur eum facilis ea, blanditiis
          iusto, doloribus ad perspiciatis quod? Voluptates iure culpa eum eos
          aspernatur quidem, corrupti quia ratione vitae nulla aut asperiores.
          Sapiente nemo omnis nulla vero labore error alias nihil eaque sunt et.
          Nostrum delectus minus iste dolorum praesentium aliquid aspernatur
          placeat ea vitae iure autem sequi eius hic necessitatibus, culpa earum
          esse maxime a dignissimos beatae ex vero accusamus iusto! Voluptate
          quos deleniti facere maiores, accusantium harum inventore veniam
          expedita sequi maxime libero, veritatis tenetur. Quaerat recusandae
          corrupti magni aliquid doloremque ex et, quos necessitatibus optio
          maxime dolorum sapiente accusamus pariatur, quidem nostrum fugiat
          totam, repellendus voluptatibus aperiam deleniti iste sit. Qui,
          ducimus porro fugit sit non rem assumenda necessitatibus facere
          pariatur esse eius minima corporis eveniet ipsam itaque voluptatibus,
          doloribus dignissimos molestias, reiciendis inventore? Laborum
          accusamus numquam officiis quasi nam est necessitatibus quaerat
          pariatur natus enim nesciunt aliquid incidunt quisquam obcaecati,
          ipsam eaque dolor quis, corporis magni! Nostrum praesentium corrupti,
          consectetur nulla et ex quod modi velit soluta molestias dolorum rerum
          omnis a doloribus vitae explicabo magni, iure incidunt consequuntur
          saepe? Accusantium eius nisi quisquam laborum doloremque quibusdam
          quod exercitationem voluptatibus architecto, corporis quia adipisci
          rerum laboriosam dolore eaque. Magni fuga autem nesciunt accusamus,
          commodi, aliquid voluptates recusandae, facilis quod deserunt
          obcaecati voluptate! Eaque error libero eos, earum, eius commodi
          aperiam excepturi eum, odio nulla itaque est. Voluptatum
          exercitationem accusantium blanditiis aut? Velit, quaerat quo placeat
          exercitationem iste sit ducimus distinctio aliquid libero, aperiam
          dolorum? Cum nostrum vero praesentium laboriosam illo aperiam quis,
          quo fugit enim ipsa consequatur excepturi non beatae et exercitationem
          doloribus animi necessitatibus corporis quisquam rerum esse optio.
          Facere officia odio voluptatum hic consequatur mollitia rem, a commodi
          quaerat explicabo delectus neque maxime quis! Nobis, eos.
          Voluptatibus, ducimus vel! Laborum accusamus similique possimus quos
          deserunt eveniet molestias, at ipsum saepe, nulla minima, deleniti
          voluptatum ratione! Optio, fuga atque! Eius tenetur possimus iure
          laudantium repudiandae labore magnam, optio, magni fuga, placeat rem
          dolorum quidem nihil tempora enim nam vero! Omnis assumenda explicabo
          eius saepe, optio at accusamus? Odit, doloremque aliquam consectetur
          veritatis quia iste autem, error numquam assumenda facere dolorem
          fuga! Repellendus quis rerum cum neque illum placeat unde quisquam
          quos quasi, minima sed ea suscipit beatae voluptatem, atque fuga nam,
          ut aliquid? Sit maxime eligendi dicta incidunt vel impedit, accusamus
          omnis!
        </p>
      </>
    </PageLayout>
  );
};
