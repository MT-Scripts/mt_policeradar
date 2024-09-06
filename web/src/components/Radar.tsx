import React, { useState } from "react";
import { Badge, DEFAULT_THEME, Divider, Paper, Text } from "@mantine/core";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";

const Radar: React.FC = () => {
    const theme = DEFAULT_THEME;
    
    const [radarLocked, setRadarLocked ] = useState(false);
    const [locale, setLocale] = useState<any>([]);

    useNuiEvent<any>('updateRadarLocked', (data) => {
        setRadarLocked(data);
    });

    useNuiEvent<any>('setLocale', (data) => {
        setLocale(data);
    });

    const [frontCarSpeed, setFrontCarSpeed] = useState(0);
    const [frontCarPlate, setFrontCarPlate] = useState('--');
    const [rearCarSpeed, setRearCarSpeed] = useState(0);
    const [rearCarPlate, setRearCarPlate] = useState('--');

    useNuiEvent<any>('updateFrontCar', (data) => {
        setFrontCarSpeed(data.speed);
        setFrontCarPlate(data.plate);
    });

    useNuiEvent<any>('updateRearCar', (data) => {
        setRearCarSpeed(data.speed);
        setRearCarPlate(data.plate);
    });

    const [position, setPosition] = useState({ left: 0, top: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useNuiEvent<any>('setRadarPosition', (data) => {
        setPosition({ left: data.x, top: data.y });
    });

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);

        const rect = event.currentTarget.getBoundingClientRect();
        setOffset({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (dragging) {
            setPosition({
                left: event.clientX - offset.x,
                top: event.clientY - offset.y,
            });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
        fetchNui('saveRadarPosition', { x: position.left, y: position.top })
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                margin: -8,
                position: "fixed",
                userSelect: 'none'
            }}
        >
            <Paper
                radius="sm"
                withBorder
                style={{
                    position: "absolute",
                    left: position.left,
                    top: position.top,
                    backgroundColor: theme.colors.dark[8],
                    padding: 8,
                    cursor: dragging ? "grabbing" : "grab",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <Badge
                    mb={5}
                    radius="sm"
                    size="sm"
                    w="100%"
                    color={(radarLocked ? 'red' : 'green')}
                    variant="light"
                >
                    {(radarLocked ? locale.locked : locale.unlocked)}
                </Badge>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                    }}
                >
                    <div style={{ width: 140, display: "flex", flexDirection: "column", gap: 2, justifyContent: "center" }}>
                        <Text
                            style={{
                                width: '100%',
                                backgroundColor: theme.colors.dark[6],
                                textAlign: "center",
                                borderRadius: theme.radius.sm,
                                border: `1px solid ${theme.colors.dark[4]}`,
                                overflow: 'hidden'
                            }}
                            content="div"
                        >
                            <Text
                                size="xs"
                                color="dimmed"
                            >
                                {locale.speed}
                            </Text>
                            <Divider />
                            <Text
                                fw={700}
                                size={30}
                                style={{
                                    backgroundColor: theme.fn.rgba(theme.colors.red[8], 0.3),
                                    color: theme.colors.red[2],
                                    textAlign: "center",
                                }}
                            >
                                {frontCarSpeed}
                            </Text>
                        </Text>
                        <Divider label={locale.front} labelPosition="center" />
                        <Text
                            style={{
                                backgroundColor: theme.colors.dark[6],
                                textAlign: "center",
                                borderRadius: theme.radius.sm,
                                border: `1px solid ${theme.colors.dark[4]}`,
                                overflow: 'hidden'
                            }}
                            content="div"
                        >
                            <Text
                                size="xs"
                                color="dimmed"
                            >
                                {locale.plate}
                            </Text>
                            <Divider />
                            <Text
                                fw={700}
                                size={20}
                                style={{
                                    backgroundColor: theme.colors.dark[0],
                                    color: theme.colors.dark[9],
                                    textAlign: "center",
                                    padding: 5
                                }}
                            >
                                {frontCarPlate}
                            </Text>
                        </Text>
                    </div>
                    <div style={{ width: 140, display: "flex", flexDirection: "column", gap: 2, justifyContent: "center" }}>
                        <Text
                            style={{
                                width: '100%',
                                backgroundColor: theme.colors.dark[6],
                                textAlign: "center",
                                borderRadius: theme.radius.sm,
                                border: `1px solid ${theme.colors.dark[4]}`,
                                overflow: 'hidden'
                            }}
                            content="div"
                        >
                            <Text
                                size="xs"
                                color="dimmed"
                            >
                                {locale.speed}
                            </Text>
                            <Divider />
                            <Text
                                fw={700}
                                size={30}
                                style={{
                                    backgroundColor: theme.fn.rgba(theme.colors.red[8], 0.3),
                                    color: theme.colors.red[2],
                                    textAlign: "center",
                                }}
                            >
                                {rearCarSpeed}
                            </Text>
                        </Text>
                        <Divider label={locale.rear} labelPosition="center" />
                        <Text
                            style={{
                            backgroundColor: theme.colors.dark[6],
                            textAlign: "center",
                            borderRadius: theme.radius.sm,
                            border: `1px solid ${theme.colors.dark[4]}`,
                            overflow: 'hidden'
                            }}
                            content="div"
                        >
                            <Text
                                size="xs"
                                color="dimmed"
                            >
                                {locale.plate}
                            </Text>
                            <Divider />
                            <Text
                                fw={700}
                                size={20}
                                style={{
                                    backgroundColor: theme.colors.dark[0],
                                    color: theme.colors.dark[9],
                                    textAlign: "center",
                                    padding: 5
                                }}
                            >
                                {rearCarPlate}
                            </Text>
                        </Text>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Radar;