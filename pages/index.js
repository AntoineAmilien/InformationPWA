import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import axios from 'axios'

import { useSession } from "next-auth/react"
import { getSession } from "next-auth/react";
import CardInformation from '../components/CardInformation';

export default function Home(props) {

  const { stockInfoByApp } = props;
  const { data: session, status } = useSession()
  const [infoByAppFilter, setInfoByAppFilter] = useState(stockInfoByApp);

  if (status === "loading") {
    return <p>Loading...</p>
  }

  async function filterByApp(applicationId) {
    if (applicationId == "Toutes") {
      setInfoByAppFilter(stockInfoByApp)
    }
    else {
      const stockInfoByAppFilter = await stockInfoByApp.filter(value => {
        return (value.application.ApplicationId.match(applicationId))
      })
      setInfoByAppFilter(stockInfoByAppFilter)
    }
  }

  return (
    <div>
      <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-4 gap-4">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="card-actions flex justify-between items-center">
              <p>Recherche : </p>
              <select class="select select-bordered w-full max-w-xs" onChange={(e) => { filterByApp(e.target.value) }}>
                <option disabled selected>Filtrer par application ?</option>
                <option value={"Toutes"}>Toutes</option>
                {session.user.Applications.map((application, index) => {
                  return (<option value={application.ApplicationId} key={index}>{application.Nom}</option>)
                })
                }
              </select>
            </div>
          </div>
        </div>
        {infoByAppFilter.map((el) => {
          return (
            el.informations.map((information, indexInformation) => {
              return (
                <>
                  <CardInformation texte={information.texte} applicationNom={el.application.Nom} nature={information.nature} key={indexInformation} />
                </>)
            })
          )
        })}

      </div>
    </div>)

}

Home.getLayout = function getLayout(page) {
  return (
    <Layout titlePage="Informations en cours sur mes applications">
      {page}
    </Layout>
  )
}


export async function getServerSideProps(context) {

  const session = await getSession(context);

  if (session?.user) {
    var stockInfoByApp = [];
    await Promise.all(
      //Recupération des informations par applications
      session.user.Applications.map(async (application) => {
        const rep = await axios.get(`https://bandeau.digitalview.nxo.eu/api/bandeau/${application.Nom}`).then(res => {
          if (!res.data.success) {
            throw "Erreur pendant la recuperation"
          }
          return res.data.data
        })

        const pushElement = {
          application: application,
          informations: rep
        }
        stockInfoByApp.push(pushElement)
      })
    )

    return {
      props: {
        session: session,
        stockInfoByApp: stockInfoByApp
      },
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/Authentification/connexion",
      },
      props: {}
    };
  }


}