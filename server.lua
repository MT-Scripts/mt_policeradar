if GetResourceState('ox_inventory') == 'started' then
    AddEventHandler('ox_inventory:openedInventory', function(source)
        TriggerClientEvent('policeradar:toggleRadar', source)
    end)
    AddEventHandler('ox_inventory:closedInventory', function(source)
        TriggerClientEvent('policeradar:toggleRadar', source)
    end)
end
