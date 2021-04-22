local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")
vRP = Proxy.getInterface("vRP")



local HUD = {}
HUD.Speedometer = {}
HUD.relogio = {}


HUD.fome  = 0
HUD.sede = 0
HUD.vida = 0
HUD.colete = 0
HUD.estamina = 0
HUD.status_mic = 0
HUD.status_radio = 0
HUD.menu_celular = false 

HUD.Speedometer.machas = 0
HUD.Speedometer.machasMax = 0
HUD.Speedometer.velocidade = 0.0
HUD.Speedometer.gasolina = 0.0
HUD.Speedometer.cinto = 0.0
HUD.Speedometer.farol_baixo = 0
HUD.Speedometer.farol_alto = 0
HUD.Speedometer.seta_esquerda = 0
HUD.Speedometer.seta_direita = 0
HUD.Speedometer.trancado = 0
HUD.Speedometer.quilometragem = 0
HUD.showRadar = false

HUD.relogio.horas = 0
HUD.relogio.minutos = 0

HUD.show = true
HUD.Speedometer.show = false

RegisterNetEvent("status:celular")
AddEventHandler("status:celular",function(status)
	HUD.menu_celular = status
end)

RegisterNetEvent("vrpex_hud:Tokovoip")
AddEventHandler("vrpex_hud:Tokovoip", function(status)
    HUD.status_mic = status
end)

RegisterNetEvent("vrpex_hud:TokovoipTalking")
AddEventHandler("vrpex_hud:TokovoipTalking", function(status)
    HUD.status_radio = status
end)

RegisterNetEvent("statusFome")
AddEventHandler("statusFome",function(number)
	HUD.fome = parseInt(number)
end)

RegisterNetEvent("statusSede")
AddEventHandler("statusSede",function(number)
	HUD.sede = parseInt(number)
end)

function calcularTempo()
    HUD.relogio.horas = GetClockHours()
    HUD.relogio.minutos = GetClockMinutes()
end

Citizen.CreateThread(function()
    while true do
        if IsPauseMenuActive() or IsScreenFadedOut() or HUD.menu_celular then
            SendNUIMessage({ HUD = { show = false} })
        else
            MontarEEnviarDadosDoPlayer()
            MontarEEnviarDadosDoCarro()
        end
        Citizen.Wait(500)
    end
end)


function MontarEEnviarDadosDoPlayer()
    local ped = PlayerPedId()
    HUD.vida = (GetEntityHealth(ped)-100)/300*100
    HUD.colete = GetPedArmour(ped)
    HUD.estamina = GetPlayerSprintStaminaRemaining(PlayerId())
    calcularTempo()
    SendNUIMessage( PrepararDadosHUD() )
end

function MontarEEnviarDadosDoCarro()
    local ped = PlayerPedId()
    if IsPedInAnyVehicle(ped) then
        HUD.Speedometer.show = true
        local carro = GetVehiclePedIsIn(ped)
        HUD.Speedometer.machas = (GetVehicleCurrentRpm(carro) * GetVehicleCurrentGear(carro)) / GetVehicleHighGear(carro)     
        HUD.Speedometer.velocidade = GetEntitySpeed(carro) * 3.6689
        HUD.Speedometer.gasolina = GetVehicleFuelLevel(carro)
        HUD.Speedometer.cinto = 0.0
        HUD.Speedometer.farol_baixo = 0
        HUD.Speedometer.farol_alto = 0
        HUD.Speedometer.seta_esquerda = 0
        HUD.Speedometer.seta_direita = 0
        HUD.Speedometer.trancado = 0
        HUD.Speedometer.quilometragem = 0
        SendNUIMessage( PrepararDadosHUDVeh() )
    else
        HUD.Speedometer.show = false
        SendNUIMessage( PrepararDadosHUDVeh() )
    end
end


function verificarCinto()

end


function PrepararDadosHUD()
    return { 
        HUD = {
            show = HUD.show,
            vida = HUD.vida,
            colete = HUD.colete,
            estamina = HUD.estamina,
            fome = HUD.fome,
            sede = HUD.sede,
            horario = HUD.relogio,
            mic_status = HUD.status_mic,
            radio_status =  HUD.status_radio
        }
    }
end

function PrepararDadosHUDVeh()
    return {
        VEH = {
            show    =           HUD.Speedometer.show,
            macha_atual  =      HUD.Speedometer.machas,
            macha_maxima =      HUD.Speedometer.machasMax,
            velocidade  =       HUD.Speedometer.velocidade, 
            gasolina  =         HUD.Speedometer.gasolina ,
            cinto  =            HUD.Speedometer.cinto ,
            farol_baixo  =      HUD.Speedometer.farol_baixo ,
            farol_alto  =       HUD.Speedometer.farol_alto ,
            seta_esquerda  =    HUD.Speedometer.seta_esquerda, 
            seta_direita  =     HUD.Speedometer.seta_direita ,
            trancado  =         HUD.Speedometer.trancado ,
            quilometragem  =    HUD.Speedometer.quilometragem, 
        }
    }
end