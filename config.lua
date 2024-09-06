return {
    -- Locale to use for the radar. The locale file must be in the locales folder of the resource.
    locale = 'en', -- DEFAULT: en

    -- Default state of the radar when the resource is started.
    defaultShowingRadar = true, -- DEFAULT: true

    -- Command to show/hide the radar.
    showRadarCommand = 'radar', -- DEFAULT: radar
    -- Keybind to show/hide the radar.
    showRadarKeybind = 'F7', -- DEFAULT: F7

    -- Command to lock/unlock the radar.
    lockRadarCommand = 'lockradar', -- DEFAULT: lockradar
    -- Keybind to lock/unlock the radar.
    lockRadarKeybind = 'F6', -- DEFAULT: F6
    
    -- Command to change the radar position.
    changeRadarPositionCommand = 'posradar', -- DEFAULT: posradar

    -- Interval in milliseconds to update the radar. The lower the value, the more accurate the radar will be, but it will consume more resources (higher resmon).
    radarUpdateInterval = 200, -- DEFAULT: 200
}