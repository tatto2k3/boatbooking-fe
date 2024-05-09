import React, { useState } from "react";
import "./Country.css";
export default function Country({
    countries,
    setSearchInfo,
    searchInfo,
    CountryClass,
    setIsOpenCountry,
    setPort,
    Port,
    setisHidden,
    isHidden
}) {

    return (
        <div className="country">
            <h5>Việt Nam</h5>
            {countries.map((port, index) => {
                return (
                    <div
                        className="airport_wrapper"
                        key={index}
                        onClick={() => {
                            if (CountryClass === "list_countries") {
                                setSearchInfo({ ...searchInfo, FromLocation: port.port_place });
                                setPort({ ...Port, fromPort: port.port_name })
                                setisHidden({ ...isHidden, fromPortIsHidden: port.port_name })
                            } else if (CountryClass === "list_countries right") {
                                setSearchInfo({ ...searchInfo, ToLocation: port.port_place });
                                setPort({ ...Port, toPort: port.port_name })
                                setisHidden({ ...isHidden, toPortIsHidden: port.port_name })
                            }
                            setIsOpenCountry(false);
                        }}
                    >
                        <div className="airport_item">
                            <div className="airport_city">
                                <div className="city_name">{port.port_place}</div>
                                <div className="city_code">{port.port_name}</div>
                            </div>
                            <div className="airport_name"> {port.id}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}