lib.locale()
local Radar = lib.load('config')
local showRadar = (not GetResourceKvpInt('showRadar') and Radar.defaultShowingRadar or false) or (GetResourceKvpInt('showRadar') == 1 and true or false)
local showingRadar = false
local radarLocked = false

notify = function(message, type)
    lib.notify({ description = message, type = type })
end

RegisterNuiCallback('hideFrame', function(data, cb)
    SetNuiFocus(false, false)
    cb(true)
end)

RegisterNuiCallback('saveRadarPosition', function(data, cb)
    SetResourceKvp('radarPosition', json.encode({ x = data.x or 1580, y = data.y or 860 }))
    cb(true)
end)

RegisterCommand(Radar.changeRadarPositionCommand, function()
    if showingRadar then
        SetNuiFocus(true, true)
    end
end)

RegisterCommand(Radar.lockRadarCommand, function()
    if showingRadar then
        radarLocked = (not radarLocked)
        SendNUIMessage({ action = 'updateRadarLocked', data = radarLocked })
        PlaySoundFrontend( -1, "Beep_Red", "DLC_HEIST_HACKING_SNAKE_SOUNDS", 1)
        notify(radarLocked and locale('locked') or locale('unlocked'), 'info')
    end
end)
RegisterKeyMapping(Radar.lockRadarCommand, locale('lockRadarKeybind'), 'KEYBOARD', Radar.lockRadarKeybind)

RegisterCommand(Radar.showRadarCommand, function()
    if IsPedInAnyVehicle(cache.ped, false) and (GetVehicleClass(GetVehiclePedIsIn(cache.ped, false)) == 18) then
        showRadar = (not showRadar)
        SetResourceKvpInt('showRadar', showRadar and 1 or 0)
        notify(showRadar and locale('enabled') or locale('disabled'), 'info')
    end
end)
RegisterKeyMapping(Radar.showRadarCommand, locale('toggleRadarKeybind'), 'KEYBOARD', Radar.showRadarKeybind)

local function vehicleLoop()
    Citizen.CreateThread(function()
        while cache.vehicle do
            if (not showingRadar) and showRadar then
                local position = json.decode(GetResourceKvpString('radarPosition')) or { x = 1580, y = 860 }
                SendNUIMessage({ action = 'setVisibleRadar', data = true })
                SendNUIMessage({ action = 'setLocale', data = json.decode(LoadResourceFile(cache.resource, ('locales/%s.json'):format(Radar.locale or 'en'))) })
                SendNUIMessage({ action = 'setRadarPosition', data = { x = position.x, y = position.y } })
                showingRadar = true
            elseif showingRadar and (not showRadar) then
                SendNUIMessage({ action = 'setVisibleRadar', data = false })
                showingRadar = false
            end

            if showingRadar and (not radarLocked) then
                local veh = GetVehiclePedIsIn(cache.ped, false)
                local coordA = GetOffsetFromEntityInWorldCoords(veh, 0.0, 1.0, 1.0)

                local coordB = GetOffsetFromEntityInWorldCoords(veh, 0.0, 105.0, 0.0)
                local frontcar = StartShapeTestCapsule(coordA, coordB, 6.0, 10, veh, 7)
                local a, b, c, d, e = GetShapeTestResult(frontcar)

                if IsEntityAVehicle(e) then
                    SendNUIMessage({ action = 'updateFrontCar', data = { speed = math.ceil(GetEntitySpeed(e) * 3.6), plate = GetVehicleNumberPlateText(e) } })
                end

                local bcoordB = GetOffsetFromEntityInWorldCoords(veh, 0.0, -105.0, 0.0)
                local rearcar = StartShapeTestCapsule(coordA, bcoordB, 3.0, 10, veh, 7)
                local f, g, h, i, j = GetShapeTestResult(rearcar)

                if IsEntityAVehicle(j) then
                    SendNUIMessage({ action = 'updateRearCar', data = { speed = math.ceil(GetEntitySpeed(j) * 3.6), plate = GetVehicleNumberPlateText(j) } })
                end
            end
            Wait(Radar.radarUpdateInterval)
        end
        if showingRadar then
            SendNUIMessage({ action = 'setVisibleRadar', data = false })
            showingRadar = false
        end
    end)
end

lib.onCache('vehicle', function(veh)
    if veh then
        if GetVehicleClass(veh) == 18 then
            vehicleLoop()
        end
    end
end)

Citizen.CreateThread(function() -- Support for restarting the script
    if LocalPlayer.state.isLoggedIn then
        print('Restarting script')
        if cache.vehicle then
            if GetVehicleClass(cache.vehicle) == 18 then
                vehicleLoop()
            end
        end
    end
end)