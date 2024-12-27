"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    Stack,
    Input,
    Center,
    Spinner,
    LinkBox,
    LinkOverlay,
    Flex,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useRouter, useSearchParams } from "next/navigation";
import newsData from "@/data/news.json";

interface NewsItem {
    date: string;
    title: string;
    description: string;
    link: string;
}

const NewsContainer: React.FC<{ type: string }> = ({ type }) => {
    const inputBg = useColorModeValue("white", "gray.600");
    const inputBorder = useColorModeValue("gray.200", "gray.500");
    const placeHolderColor = useColorModeValue("gray.500", "whiteAlpha.700");
    const cardBgColor = useColorModeValue("white", "gray.600");
    const cardHeading = useColorModeValue("yellow.600", "whiteAlpha.800");
    const textCol = useColorModeValue("gray.500", "gray.400");

    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("q") || "");
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
    const [displayedNews, setDisplayedNews] = useState<NewsItem[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [debouncing, setDebouncing] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const newsPerPage = 10;
    const observer = useRef<IntersectionObserver | null>(null);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    // Sort and filter news
    const sortedNews: NewsItem[] = newsData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const getFilteredNewsByType = useCallback((): NewsItem[] => {
        return type === "alert"
            ? sortedNews.filter((news) => news.title !== "New Paper Published")
            : sortedNews.filter((news) => news.title === "New Paper Published");
    }, [type, sortedNews]);

    const applySearchFilter = useCallback(
        (newsList: NewsItem[]) => {
            if (!searchTerm) return newsList;
            const search = searchTerm.toLowerCase();
            return newsList.filter((news) =>
                [news.title, news.description].some((field) =>
                    field.toLowerCase().includes(search)
                )
            );
        },
        [searchTerm]
    );

    // Filter and update news
    useEffect(() => {
        const filtered = applySearchFilter(getFilteredNewsByType());
        setFilteredNews(filtered);
        setDisplayedNews(filtered.slice(0, newsPerPage));
        setHasMore(filtered.length > newsPerPage);

        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.set("q", searchTerm);

        const hash = type === "alert" ? "#alert" : "#papers";
        router.replace(`?${queryParams.toString()}${hash}`);
    }, [type, searchTerm, getFilteredNewsByType, applySearchFilter, router]);

    // Infinite scrolling logic
    const loadMoreNews = () => {
        if (isLoadingMore || !hasMore) return;

        setIsLoadingMore(true);

        setTimeout(() => {
            const nextNews = filteredNews.slice(
                displayedNews.length,
                displayedNews.length + newsPerPage
            );
            setDisplayedNews((prev) => [...prev, ...nextNews]);
            setHasMore(displayedNews.length + nextNews.length < filteredNews.length);
            setIsLoadingMore(false);
        }, 500);
    };

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) loadMoreNews();
            },
            { root: null, rootMargin: "0px", threshold: 1.0 }
        );

        if (observer.current && document.querySelector("#infinite-scroll-trigger")) {
            observer.current.observe(document.querySelector("#infinite-scroll-trigger")!);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [loadMoreNews]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);

        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        setDebouncing(true);
        debounceTimer.current = setTimeout(() => {
            setDebouncing(false);
        }, 500);
    };

    return (
        <>
            {/* Search input */}
            <Stack mb={6} spacing={4}>
                <Input
                    placeholder="Search news by title"
                    value={searchTerm}
                    onChange={handleSearch}
                    bg={inputBg}
                    borderColor={inputBorder}
                    _placeholder={{ color: placeHolderColor }}
                />
            </Stack>

            {debouncing ? (
                <Center py={10}>
                    <Spinner size="xl" color="yellow.500" />
                </Center>
            ) : displayedNews.length > 0 ? (
                <Stack spacing={3}>
                    {displayedNews.map((news, index) => (
                        <LinkBox
                            key={index}
                            as="article"
                            p={5}
                            shadow="md"
                            borderWidth="1px"
                            borderRadius="md"
                            bg={cardBgColor}
                            _hover={{ shadow: "lg", transform: "translateY(-5px)" }}
                            transition="all 0.3s ease"
                        >
                            <Flex justify="space-between" align="center" mb={2}>
                                <Text fontWeight="bold" color={textCol} fontSize="md">
                                    {new Date(news.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}{" "}
                                    :: {news.title}
                                </Text>
                            </Flex>

                            <Text color={cardHeading} fontSize="lg" fontWeight="bold">
                                {news.link ? (
                                    <LinkOverlay href={news.link} isExternal>
                                        {news.description} <ExternalLinkIcon mx="2px" />
                                    </LinkOverlay>
                                ) : (
                                    news.description
                                )}
                            </Text>
                        </LinkBox>
                    ))}
                </Stack>
            ) : (
                <Text>No news found</Text>
            )}

            {/* Infinite Scroll Trigger */}
            {hasMore && (
                <div
                    id="infinite-scroll-trigger"
                    style={{ height: "1px", visibility: "hidden" }}
                ></div>
            )}

            {isLoadingMore && (
                <Center py={6}>
                    <Spinner size="xl" color="yellow.500" />
                </Center>
            )}
        </>
    );
};

export default NewsContainer;
