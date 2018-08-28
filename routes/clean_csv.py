import pandas as pd 
import math
import sys

print(sys.argv[1])
df = pd.read_csv(sys.argv[1],sep=";")


def nanCheck(raw_string):
    number = float(raw_string)
    if(math.isnan(number)):
        return True
    else:
        return False

#numeros
def fixNumbers(dataset):
    li_numero = dataset["numero"].tolist()
    int_li = []
    for i in li_numero:
        deal_with_dash = str(i).split("-")
        if (not nanCheck(deal_with_dash[0])):
            int_li.append(int(float(deal_with_dash[0])))
        else:
            int_li.append(-1)
    return (int_li)

def fixArea(dataset,col="area"):
    li_area = dataset[col].tolist()
    int_li = []
    for i in li_area:
        if(not nanCheck(i)):
            int_li.append(int(float(i)))
        else:
            int_li.append(-1)
    return (int_li)


def fixPriceBySqm(dataset):
    li_priceSqm = dataset["price_by_sqm"].tolist()
    float_list = []
    for i in li_priceSqm:
        formatted = "{:.2f}".format(i)
        if( not nanCheck(formatted)):
            float_list.append(float(formatted))
        else:
            float_list.append(-1.00)

    return(float_list)


def fixCondFee(dataset,col="condominium_fee"):
    li_condFee = dataset[col].tolist()
    int_list = []
    for i in li_condFee:
        fixRS = str(i).split("R$")
        fixed = fixRS[len(fixRS)-1]
        if(not nanCheck(fixed)):
            fixed = fixed.replace(".","")
            int_list.append(int(fixed))
        else:
            int_list.append(-1)
    
    return(int_list)

def fixIptu(dataset):
    return fixCondFee(dataset,"iptu")

def fixBathroom(dataset):
    return fixArea(dataset,"bathrooms")

def fixRooms(dataset):
    return fixArea(dataset,"rooms")

def fixGarage(dataset):
    return fixArea(dataset,"garage")


def fixLat(dataset,col="latitude"):
    lat = dataset[col].tolist()
    lat_li = []
    for i in lat:
        fix = str(i).replace(".","")
        if(not nanCheck(fix)):
            fix = fix[:3] + "." + fix[3:]
            lat_li.append(float(fix))
        else:
            lat_li.append(float(0))

    return (lat_li)

def fixLong (dataset):
    return fixLat(dataset,"longitude")



def fixAllAndSave(fileName,dataset,cols):
    for key in cols:
        new_col = cols[key](dataset)
        dataset[key] = new_col

    dataset = dataset.drop(dataset[dataset["latitude"] >= 0].index)
    dataset = dataset.drop(dataset[dataset["longitude"] >= 0].index)
    
    dataset.to_json(fileName,orient='records')
    print("file fixed!")


fixes = {
    "numero" : fixNumbers,
    "area" : fixArea,
    "price_by_sqm": fixPriceBySqm,
    "condominium_fee" : fixCondFee,
    "iptu"  : fixIptu,
    "rooms"  :  fixRooms,
    "bathrooms" :  fixBathroom,
    "garage" : fixGarage,
    "latitude" : fixLat,
    "longitude" : fixLong
}
try :
    fixAllAndSave("./routes/uploaded.json",df,fixes)
except Exception, e:
    print >> sys.stderr, "does not exist"
    print >> sys.stderr, "Exception: %s" % str(e)
    sys.exit(1)
    

"""
'data'  DD/MM/YY
'rua' STRING
'numero' : int -
'bairro' : string
'condominio' :string
'price' : int - 
'area' : int -
'price_by_sqm': float - 
'condominium_fee' : int -
'iptu'   : int - 
'rooms'  : int - 
'bathrooms' : int - 
'garage' : int - 
'agent' string
'agent_number' :string 
'latitude' : float
'longitude' float
'property_d' : ??
'url' : string
"""
