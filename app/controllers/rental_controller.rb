class RentalController < ApplicationController
  before_action do 
    @carsData = [
      {
        id: SecureRandom.uuid(),
        name: "Hyundai Grand i10",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1517236166_1509779915_152_i10.webp",
        price: 1301,
        location: "Koramangala",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        car_type: "Hatchback"
      },
      {
        id: SecureRandom.uuid(),
        name: "Mahindra TUV300",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1508769709_tuv300_CARDIMENSION%282%29.png",
        price: 1360,
        location: "Koramangala",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 7,
        fuel_type: "Diesel",
        transmission: "Manual",
        car_type: "SUV"
      },
      {
        id: SecureRandom.uuid(),
        name: "Hyundai i20 Magna",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1517235691_1503654158_i20_magna_carimage_1_.webp",
        price: 1430,
        location: "Koramangala",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 5,
        fuel_type: "Diesel",
        transmission: "Manual",
        car_type: "Hatchback"
      },
      {
        id: SecureRandom.uuid(),
        name: "Mahindra Verito",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1539321232_mahindra_Vertio_new_final.webp",
        price: 1440,
        location: "Koramangala",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 5,
        fuel_type: "Diesel",
        transmission: "Manual",
        car_type: "Sedan"
      },
      {
        id: SecureRandom.uuid(),
        name: "Honda Amaze 2018",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1545022905_amaze2018.webp",
        price: 1570,
        location: "Koramangala",
        availability: ["Sat", "Sun"],
        seats: 5,
        fuel_type: "Diesel",
        transmission: "Automatic",
        car_type: "Sedan"
      },
      {
        id: SecureRandom.uuid(),
        name: "Hyundai Creta",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1517236391_1511333933_creta_CARDIMENSION.webp",
        price: 1700,
        location: "Koramangala",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 5,
        fuel_type: "Diesel",
        transmission: "Manual",
        car_type: "Mini SUV"
      },
      {
        id: SecureRandom.uuid(),
        name: "Maruti Ritz",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1505295259_1500892807_ritz2%281%29.webp",
        price: 1180,
        location: "HSR Layout",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        car_type: "Hatchback"
      },
      {
        id: SecureRandom.uuid(),
        name: "Tata Bolt",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1505297592_1500892399_bolt.webp",
        price: 1150,
        location: "HSR Layout",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 5,
        fuel_type: "Diesel",
        transmission: "Manual",
        car_type: "Hatchback"
      },
      {
        id: SecureRandom.uuid(),
        name: "Hyundai Xcent",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1505390422_1500896796_xcent.webp",
        price: 1450,
        location: "HSR Layout",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 5,
        fuel_type: "Diesel",
        transmission: "Manual",
        car_type: "Sedan"
      },
      {
        id: SecureRandom.uuid(),
        name: "Suzuki Vitara Brezza",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1522147962_vitarabrezza-final_CARDIMENSION.webp",
        price: 1580,
        location: "HSR Layout",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 5,
        fuel_type: "Diesel",
        transmission: "Manual",
        car_type: "Mini SUV"
      },
      {
        id: SecureRandom.uuid(),
        name: "Tata Hexa XE",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1525356832_tatahexa.png",
        price: 1980,
        location: "HSR Layout",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 7,
        fuel_type: "Diesel",
        transmission: "Manual",
        car_type: "SUV"
      },
      {
        id: SecureRandom.uuid(),
        name: "Maruti Suzuki Ertiga",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1505393064_1500892647_etriga.webp",
        price: 2000,
        location: "HSR Layout",
        availability: ["Sat", "Sun"],
        seats: 7,
        fuel_type: "Diesel",
        transmission: "Manual",
        car_type: "SUV"
      },
      {
        id: SecureRandom.uuid(),
        name: "Hyundai Eon",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1505389673_1500892609_eon.webp",
        price: 1100,
        location: "Indiranagar",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        car_type: "Hatchback"
      },
      {
        id: SecureRandom.uuid(),
        name: "Ignis",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1526893284_ignis.webp",
        price: 1150,
        location: "Indiranagar",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        car_type: "Hatchback"
      },
      {
        id: SecureRandom.uuid(),
        name: "Maruti Suzuki Baleno",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1517234251_1503651026_balenoimage_carimage.webp",
        price: 1433,
        location: "Indiranagar",
        availability: ["Mon","Tue", "Wed", "Thu", "Fri"],
        seats: 5,
        fuel_type: "Diesel",
        transmission: "Manual",
        car_type: "Hatchback"
      },
      {
        id: SecureRandom.uuid(),
        name: "Honda Jazz",
        photo: "https://jtride-data.s3.ap-south-1.amazonaws.com/uploads/1505393385_1504243587_jazz_CARDIMENSION.webp",
        price: 1500,
        location: "Indiranagar",
        availability: ["Sat", "Sun"],
        seats: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        car_type: "Hatchback"
      }
    ]
    gon.push({
      carData: @carsData
    })
  end

  def index
    gon.push({
      locations: @carsData.map{|car| car[:location]}.uniq
    })
  end

  def show
    @selectedDay = Date.parse(params[:date])
    @day = @selectedDay.strftime("%a")
    @selectedCars = @carsData.select{ |car| car[:location] == params[:location] and car[:availability].include?(@day) }
  rescue StandardError => e
  end
end
